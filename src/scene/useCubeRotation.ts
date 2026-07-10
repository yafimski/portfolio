import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { Group, Quaternion } from "three";
import {
  BOB_AMPLITUDE,
  BOB_SPEED,
  DEFAULT_QUATERNION,
  DRAG_THRESHOLD,
  DRAG_X_SENS,
  DRAG_Y_SENS,
  IDLE_SPIN,
  MIN_ANGULAR_SPEED,
  MOMENTUM_FRICTION,
  RESET_DURATION,
  VELOCITY_SMOOTH,
  easeOutCubic,
} from "./projectCubeConfig";
import { CUBE_Y } from "./sceneConfig";
import type { useCubeAnimator } from "./useCubeAnimator";

type CubeAnimator = ReturnType<typeof useCubeAnimator>;

type UseCubeRotationOptions = {
  groupRef: RefObject<Group | null>;
  cubeIndex: number;
  baseOffset: { x: number; y: number; z: number };
  isLocked: boolean;
  animator: CubeAnimator;
};

export function useCubeRotation({
  groupRef,
  cubeIndex,
  baseOffset,
  isLocked,
  animator,
}: UseCubeRotationOptions) {
  const { gl } = useThree();
  const idleQuatRef = useRef(new Quaternion());
  const textureOpacityRef = useRef(1);
  const angularVelocityRef = useRef({ yaw: 0, pitch: 0 });
  const smoothedVelocityRef = useRef({ yaw: 0, pitch: 0 });
  const pointerDeltaRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, moved: false });
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const isResettingRef = useRef(false);
  const resetProgressRef = useRef(0);
  const resetStartQuatRef = useRef(new Quaternion());

  const clearMomentum = () => {
    angularVelocityRef.current.yaw = 0;
    angularVelocityRef.current.pitch = 0;
    smoothedVelocityRef.current.yaw = 0;
    smoothedVelocityRef.current.pitch = 0;
  };

  const applyDragRotation = useCallback((dx: number, dy: number) => {
    if (!groupRef.current || (dx === 0 && dy === 0)) return;

    const rotY = new Quaternion().setFromAxisAngle(
      { x: 0, y: 1, z: 0 },
      dx * DRAG_Y_SENS,
    );
    const rotX = new Quaternion().setFromAxisAngle(
      { x: 1, y: 0, z: 0 },
      dy * DRAG_X_SENS,
    );

    groupRef.current.quaternion.premultiply(rotY).premultiply(rotX);
  }, [groupRef]);

  const updateDragVelocity = useCallback((dx: number, dy: number, dt: number) => {
    if (dx === 0 && dy === 0) return;

    const instantYaw = (dx * DRAG_Y_SENS) / dt;
    const instantPitch = (dy * DRAG_X_SENS) / dt;
    const blend = VELOCITY_SMOOTH;

    smoothedVelocityRef.current.yaw =
      smoothedVelocityRef.current.yaw * (1 - blend) + instantYaw * blend;
    smoothedVelocityRef.current.pitch =
      smoothedVelocityRef.current.pitch * (1 - blend) + instantPitch * blend;

    angularVelocityRef.current.yaw = smoothedVelocityRef.current.yaw;
    angularVelocityRef.current.pitch = smoothedVelocityRef.current.pitch;
  }, []);

  const consumePointerDelta = (dt: number) => {
    const dx = pointerDeltaRef.current.x;
    const dy = pointerDeltaRef.current.y;
    pointerDeltaRef.current.x = 0;
    pointerDeltaRef.current.y = 0;

    applyDragRotation(dx, dy);
    updateDragVelocity(dx, dy, dt);
  };

  const resetRotation = () => {
    if (!groupRef.current || animator.isInteracting() || isLocked) return;
    clearMomentum();
    resetStartQuatRef.current.copy(groupRef.current.quaternion);
    resetProgressRef.current = 0;
    isResettingRef.current = true;
  };

  useEffect(() => {
    const canvas = gl.domElement;

    const handleMove = (e: PointerEvent) => {
      if (
        !isDraggingRef.current ||
        !groupRef.current ||
        isInteractingRef.current
      ) {
        return;
      }

      const dx = e.clientX - lastPointerRef.current.x;
      const dy = e.clientY - lastPointerRef.current.y;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };

      const totalDx = e.clientX - dragStartRef.current.x;
      const totalDy = e.clientY - dragStartRef.current.y;
      if (
        Math.abs(totalDx) > DRAG_THRESHOLD ||
        Math.abs(totalDy) > DRAG_THRESHOLD
      ) {
        dragStartRef.current.moved = true;
      }

      pointerDeltaRef.current.x += dx;
      pointerDeltaRef.current.y += dy;
    };

    const handleUp = () => {
      if (isDraggingRef.current && groupRef.current) {
        const dx = pointerDeltaRef.current.x;
        const dy = pointerDeltaRef.current.y;
        pointerDeltaRef.current.x = 0;
        pointerDeltaRef.current.y = 0;

        if (dx !== 0 || dy !== 0) {
          applyDragRotation(dx, dy);
          updateDragVelocity(dx, dy, 1 / 60);
        }
      }

      isDraggingRef.current = false;
      gl.domElement.style.cursor = "auto";
    };

    canvas.addEventListener("pointermove", handleMove);
    canvas.addEventListener("pointerup", handleUp);
    canvas.addEventListener("pointercancel", handleUp);

    return () => {
      canvas.removeEventListener("pointermove", handleMove);
      canvas.removeEventListener("pointerup", handleUp);
      canvas.removeEventListener("pointercancel", handleUp);
    };
  }, [gl.domElement, applyDragRotation, updateDragVelocity, groupRef]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const bobOffset =
      Math.sin(state.clock.elapsedTime * BOB_SPEED + cubeIndex * 1.2) *
      BOB_AMPLITUDE;
    const isAnimating = animator.isInteracting();
    isInteractingRef.current = isAnimating;

    if (isAnimating) {
      groupRef.current.quaternion.copy(animator.currentQuatRef.current);
      idleQuatRef.current.copy(animator.currentQuatRef.current);
    } else if (isResettingRef.current) {
      resetProgressRef.current = Math.min(
        1,
        resetProgressRef.current + delta / RESET_DURATION,
      );
      const eased = easeOutCubic(resetProgressRef.current);
      groupRef.current.quaternion.slerpQuaternions(
        resetStartQuatRef.current,
        DEFAULT_QUATERNION,
        eased,
      );
      idleQuatRef.current.copy(groupRef.current.quaternion);

      if (resetProgressRef.current >= 1) {
        isResettingRef.current = false;
        groupRef.current.quaternion.copy(DEFAULT_QUATERNION);
        idleQuatRef.current.copy(DEFAULT_QUATERNION);
      }
    } else if (isDraggingRef.current) {
      const dx = pointerDeltaRef.current.x;
      const dy = pointerDeltaRef.current.y;

      if (dx !== 0 || dy !== 0) {
        consumePointerDelta(delta);
      } else {
        const decay = Math.pow(MOMENTUM_FRICTION, delta * 60);
        smoothedVelocityRef.current.yaw *= decay;
        smoothedVelocityRef.current.pitch *= decay;
        angularVelocityRef.current.yaw = smoothedVelocityRef.current.yaw;
        angularVelocityRef.current.pitch = smoothedVelocityRef.current.pitch;
      }

      idleQuatRef.current.copy(groupRef.current.quaternion);
    } else {
      const { yaw, pitch } = angularVelocityRef.current;
      const speed = Math.hypot(yaw, pitch);

      if (speed > MIN_ANGULAR_SPEED) {
        const rotY = new Quaternion().setFromAxisAngle(
          { x: 0, y: 1, z: 0 },
          yaw * delta,
        );
        const rotX = new Quaternion().setFromAxisAngle(
          { x: 1, y: 0, z: 0 },
          pitch * delta,
        );
        groupRef.current.quaternion.premultiply(rotY).premultiply(rotX);
        idleQuatRef.current.copy(groupRef.current.quaternion);

        const decay = Math.pow(MOMENTUM_FRICTION, delta * 60);
        angularVelocityRef.current.yaw *= decay;
        angularVelocityRef.current.pitch *= decay;
      } else {
        clearMomentum();
        idleQuatRef.current.multiply(
          new Quaternion().setFromAxisAngle(
            { x: 0, y: 1, z: 0 },
            delta * IDLE_SPIN,
          ),
        );
        groupRef.current.quaternion.copy(idleQuatRef.current);
      }
    }

    const scale = animator.currentScaleRef.current;
    const push = animator.currentPosRef.current;
    groupRef.current.scale.setScalar(scale);
    groupRef.current.position.set(
      baseOffset.x + push.x,
      CUBE_Y + bobOffset + push.y + baseOffset.y,
      baseOffset.z + push.z,
    );

    textureOpacityRef.current = isAnimating
      ? animator.textureOpacityRef.current
      : 1;
  });

  const onPointerDown = (e: { clientX: number; clientY: number }) => {
    if (isLocked || animator.isInteracting() || isResettingRef.current) {
      return;
    }
    isDraggingRef.current = true;
    clearMomentum();
    pointerDeltaRef.current.x = 0;
    pointerDeltaRef.current.y = 0;
    dragStartRef.current = { x: e.clientX, y: e.clientY, moved: false };
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    gl.domElement.style.cursor = "grabbing";
  };

  return {
    textureOpacityRef,
    resetRotation,
    onPointerDown,
    wasDragged: () => dragStartRef.current.moved,
    clearMomentum,
  };
}
