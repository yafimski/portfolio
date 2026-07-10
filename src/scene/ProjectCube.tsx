import { forwardRef, useImperativeHandle, useRef, useState } from "react";
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
        if (state !== "expanded" && state !== "switching") return;

        const face = faces.find((f) => f.faceIndex === faceIndex);
        if (!face?.project) return;

        animator.switchFace(faceIndex);
        onProjectExpand(face.project);
      },
      expandFace: (faceIndex: number) => {
        if (!groupRef.current || animator.isInteracting()) return;

        const face = faces.find((f) => f.faceIndex === faceIndex);
        if (!face?.project) return;

        clearMomentum();
        onProjectExpand(face.project);
        animator.expand(faceIndex, groupRef.current.quaternion.clone());
      },
      overlayOpacityRef: animator.overlayOpacityRef,
    }));

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
