import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";
import { CubeFace } from "./CubeFace";
import { FACE_CONFIGS } from "./faceConfig";
import type { ProjectCubeHandle, ProjectCubeProps } from "./projectCubeTypes";
import { useCubeAnimator } from "./useCubeAnimator";
import { useCubeRotation } from "./useCubeRotation";

export type { ProjectCubeHandle } from "./projectCubeTypes";

export const ProjectCube = forwardRef<ProjectCubeHandle, ProjectCubeProps>(
  function ProjectCube(
    {
      cubeIndex,
      faces,
      baseOffset,
      isLocked,
      onProjectExpand,
      onProjectCollapse,
    },
    ref,
  ) {
    const groupRef = useRef<Group>(null);
    const [hoveredFace, setHoveredFace] = useState<number | null>(null);
    const pendingNavigateFaceRef = useRef<number | null>(null);
    const pendingExpandFaceRef = useRef<{
      faceIndex: number;
      onComplete?: () => void;
    } | null>(null);
    const animator = useCubeAnimator();

    const {
      textureOpacityRef,
      resetRotation,
      onPointerDown,
      wasDragged,
      clearMomentum,
    } = useCubeRotation({
      groupRef,
      cubeIndex,
      baseOffset,
      isLocked,
      animator,
    });

    useImperativeHandle(ref, () => ({
      collapse: (onComplete?: () => void) => {
        pendingNavigateFaceRef.current = null;
        pendingExpandFaceRef.current = null;
        animator.collapse(() => {
          if (onComplete) {
            onComplete();
          } else {
            onProjectCollapse();
          }
        });
      },
      resetRotation,
      goHome: () => {
        pendingNavigateFaceRef.current = null;
        pendingExpandFaceRef.current = null;
        if (animator.isInteracting()) {
          animator.collapse(() => {
            onProjectCollapse();
          });
        } else {
          resetRotation();
        }
      },
      navigateToFace: (faceIndex: number) => {
        const state = animator.getState();
        if (state !== "expanded" && state !== "switching") {
          pendingNavigateFaceRef.current = faceIndex;
          return false;
        }

        const face = faces.find((f) => f.faceIndex === faceIndex);
        if (!face?.project) return false;

        pendingNavigateFaceRef.current = null;
        animator.switchFace(faceIndex);
        onProjectExpand(face.project);
        return true;
      },
      expandFace: (faceIndex: number, onComplete?: () => void) => {
        if (!groupRef.current || animator.isInteracting()) {
          pendingExpandFaceRef.current = { faceIndex, onComplete };
          return;
        }

        const face = faces.find((f) => f.faceIndex === faceIndex);
        if (!face?.project) return;

        pendingExpandFaceRef.current = null;
        clearMomentum();
        onProjectExpand(face.project);
        animator.expand(
          faceIndex,
          groupRef.current.quaternion.clone(),
          onComplete,
        );
      },
      overlayOpacityRef: animator.overlayOpacityRef,
    }));

    useFrame(() => {
      const pendingFace = pendingNavigateFaceRef.current;
      if (pendingFace !== null) {
        const state = animator.getState();
        if (state === "expanded" || state === "switching") {
          const face = faces.find((f) => f.faceIndex === pendingFace);
          if (face?.project) {
            pendingNavigateFaceRef.current = null;
            animator.switchFace(pendingFace);
            onProjectExpand(face.project);
          }
        }
      }

      const pendingExpand = pendingExpandFaceRef.current;
      if (
        pendingExpand &&
        groupRef.current &&
        !animator.isInteracting()
      ) {
        const face = faces.find((f) => f.faceIndex === pendingExpand.faceIndex);
        if (face?.project) {
          pendingExpandFaceRef.current = null;
          clearMomentum();
          onProjectExpand(face.project);
          animator.expand(
            pendingExpand.faceIndex,
            groupRef.current.quaternion.clone(),
            pendingExpand.onComplete,
          );
        }
      }
    });

    const handleFaceClick = (faceIndex: number) => {
      if (isLocked || wasDragged() || animator.isInteracting()) {
        return;
      }

      const face = faces.find((f) => f.faceIndex === faceIndex);
      if (!face?.project || !groupRef.current) return;

      clearMomentum();
      onProjectExpand(face.project);

      const currentQuat = groupRef.current.quaternion.clone();
      animator.expand(faceIndex, currentQuat);
    };

    return (
      <group ref={groupRef}>
        {FACE_CONFIGS.map((config) => {
          const faceData = faces.find(
            (f) => f.faceIndex === config.faceIndex,
          ) ?? {
            cubeIndex,
            faceIndex: config.faceIndex,
            thumbnail: "",
            project: null,
            isPlaceholder: true,
          };
          return (
            <CubeFace
              key={config.faceIndex}
              faceIndex={config.faceIndex}
              position={config.position}
              rotation={config.rotation}
              thumbnail={faceData.thumbnail}
              isPlaceholder={faceData.isPlaceholder}
              placeholderLabel={faceData.placeholderLabel}
              isHovered={!isLocked && hoveredFace === config.faceIndex}
              isExpanded={animator.isExpanded()}
              textureOpacityRef={textureOpacityRef}
              onPointerOver={(faceIndex) => {
                if (!isLocked) setHoveredFace(faceIndex);
              }}
              onPointerOut={() => setHoveredFace(null)}
              onPointerDown={(e) => onPointerDown(e)}
              onClick={handleFaceClick}
            />
          );
        })}
      </group>
    );
  },
);
