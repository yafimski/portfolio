import type { RefObject } from "react";
import type { Vector3 } from "three";
import type { CubeFaceData, Project } from "../projects/types";

export type ProjectCubeHandle = {
  collapse: (onComplete?: () => void) => void;
  resetRotation: () => void;
  goHome: () => void;
  navigateToFace: (faceIndex: number) => boolean;
  expandFace: (faceIndex: number, onComplete?: () => void) => void;
  overlayOpacityRef: RefObject<number>;
};

export type ProjectCubeProps = {
  cubeIndex: number;
  faces: CubeFaceData[];
  baseOffset: Vector3;
  isLocked: boolean;
  onProjectExpand: (project: Project) => void;
  onProjectCollapse: () => void;
};
