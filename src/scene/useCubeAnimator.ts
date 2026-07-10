import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { FACE_CONFIGS } from "./faceConfig";
import { CAMERA_DIRECTION, getExpandedOffset } from "./sceneConfig";
import { getSceneLayout, type SceneLayout } from "./sceneLayout";

export { IDLE_Y, EXPANDED_SCALE } from "./sceneConfig";

const DURATION = 2.8;
const SWITCH_DURATION = 1.0;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type AnimatorState =
  | "idle"
  | "expanding"
  | "expanded"
  | "collapsing"
  | "switching";

export function useCubeAnimator() {
  const { size } = useThree();
  const layoutRef = useRef<SceneLayout>(getSceneLayout(size.width, size.height));

  useLayoutEffect(() => {
    layoutRef.current = getSceneLayout(size.width, size.height);
  }, [size.width, size.height]);

  const stateRef = useRef<AnimatorState>("idle");
  const progressRef = useRef(0);
  const targetQuatRef = useRef(new Quaternion());
  const startQuatRef = useRef(new Quaternion());
  const idleQuatRef = useRef(new Quaternion());
  const currentQuatRef = useRef(new Quaternion());
  const startScaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const currentScaleRef = useRef(1);
  const startPosRef = useRef(new Vector3());
  const targetPosRef = useRef(new Vector3());
  const currentPosRef = useRef(new Vector3());
  const textureOpacityRef = useRef(1);
  const overlayOpacityRef = useRef(0);
  const activeFaceRef = useRef<number | null>(null);
  const onExpandCompleteRef = useRef<(() => void) | null>(null);
  const onCollapseCompleteRef = useRef<(() => void) | null>(null);

  const expand = (
    faceIndex: number,
    currentQuat: Quaternion,
    onComplete?: () => void,
  ) => {
    const face = FACE_CONFIGS.find((f) => f.faceIndex === faceIndex);
    if (!face) return;

    const localNormal = new Vector3(...face.localNormal);
    const worldNormal = localNormal
      .clone()
      .applyQuaternion(currentQuat)
      .normalize();
    targetQuatRef.current
      .copy(currentQuat)
      .premultiply(
        new Quaternion().setFromUnitVectors(worldNormal, CAMERA_DIRECTION),
      );
    startQuatRef.current.copy(currentQuat);
    idleQuatRef.current.copy(currentQuat);
    const layout = layoutRef.current;
    startScaleRef.current = currentScaleRef.current;
    targetScaleRef.current = layout.expandedScale;
    startPosRef.current.copy(currentPosRef.current);
    targetPosRef.current.copy(getExpandedOffset(layout.expandedPush));
    activeFaceRef.current = faceIndex;
    progressRef.current = 0;
    stateRef.current = "expanding";
    onExpandCompleteRef.current = onComplete ?? null;
  };

  const collapse = (onComplete?: () => void) => {
    if (stateRef.current === "idle") {
      onComplete?.();
      return;
    }

    if (stateRef.current === "collapsing") {
      if (onComplete) {
        const previous = onCollapseCompleteRef.current;
        onCollapseCompleteRef.current = () => {
          previous?.();
          onComplete();
        };
      }
      return;
    }

    const preExpandQuat = startQuatRef.current.clone();
    startQuatRef.current.copy(currentQuatRef.current);
    targetQuatRef.current.copy(preExpandQuat);
    startScaleRef.current = currentScaleRef.current;
    targetScaleRef.current = 1;
    startPosRef.current.copy(currentPosRef.current);
    targetPosRef.current.set(0, 0, 0);

    stateRef.current = "collapsing";
    progressRef.current = 0;
    onCollapseCompleteRef.current = onComplete ?? null;
  };

  const switchFace = (faceIndex: number) => {
    if (stateRef.current !== "expanded" && stateRef.current !== "switching") {
      return;
    }
    if (activeFaceRef.current === faceIndex) return;

    const face = FACE_CONFIGS.find((f) => f.faceIndex === faceIndex);
    if (!face) return;

    const localNormal = new Vector3(...face.localNormal);
    const worldNormal = localNormal
      .clone()
      .applyQuaternion(idleQuatRef.current)
      .normalize();
    const newTarget = idleQuatRef.current
      .clone()
      .premultiply(
        new Quaternion().setFromUnitVectors(worldNormal, CAMERA_DIRECTION),
      );

    startQuatRef.current.copy(currentQuatRef.current);
    targetQuatRef.current.copy(newTarget);
    const layout = layoutRef.current;
    startScaleRef.current = currentScaleRef.current;
    targetScaleRef.current = layout.expandedScale;
    startPosRef.current.copy(currentPosRef.current);
    targetPosRef.current.copy(getExpandedOffset(layout.expandedPush));
    activeFaceRef.current = faceIndex;
    progressRef.current = 0;
    stateRef.current = "switching";
  };

  useFrame((_, delta) => {
    const state = stateRef.current;

    if (
      state === "expanding" ||
      state === "collapsing" ||
      state === "switching"
    ) {
      const duration = state === "switching" ? SWITCH_DURATION : DURATION;
      progressRef.current = Math.min(1, progressRef.current + delta / duration);
      const eased = easeOutCubic(progressRef.current);
      const collapsing = state === "collapsing";
      const t = eased;

      currentQuatRef.current.slerpQuaternions(
        startQuatRef.current,
        targetQuatRef.current,
        t,
      );
      currentScaleRef.current =
        startScaleRef.current +
        (targetScaleRef.current - startScaleRef.current) * t;
      currentPosRef.current.lerpVectors(
        startPosRef.current,
        targetPosRef.current,
        t,
      );

      if (state === "switching") {
        textureOpacityRef.current = 1;
        overlayOpacityRef.current = 1;
      } else {
        textureOpacityRef.current = collapsing ? eased : 1 - eased;
        overlayOpacityRef.current = collapsing ? 1 - eased : eased;
      }

      if (progressRef.current >= 1) {
        if (state === "expanding" || state === "switching") {
          stateRef.current = "expanded";
          onExpandCompleteRef.current?.();
          onExpandCompleteRef.current = null;
        } else {
          stateRef.current = "idle";
          activeFaceRef.current = null;
          onCollapseCompleteRef.current?.();
          onCollapseCompleteRef.current = null;
        }
      }
    }
  });

  return {
    expand,
    collapse,
    switchFace,
    currentQuatRef,
    currentScaleRef,
    currentPosRef,
    textureOpacityRef,
    overlayOpacityRef,
    activeFaceRef,
    getState: () => stateRef.current,
    isExpanded: () =>
      stateRef.current === "expanded" ||
      stateRef.current === "expanding" ||
      stateRef.current === "switching",
    isInteracting: () => stateRef.current !== "idle",
  };
}
