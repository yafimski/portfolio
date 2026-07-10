import {
  CAMERA_FOV,
  EXPANDED_PUSH,
  EXPANDED_SCALE,
  type CubeArrangement,
} from "./sceneConfig";

export type SceneLayout = {
  fov: number;
  cameraDistanceScale: number;
  spacingScale: number;
  cubeBackScale: number;
  arrangement: CubeArrangement;
  expandedScale: number;
  expandedPush: number;
};

const DEFAULT_LAYOUT: SceneLayout = {
  fov: CAMERA_FOV,
  cameraDistanceScale: 1,
  spacingScale: 1,
  cubeBackScale: 1,
  arrangement: "horizontal",
  expandedScale: EXPANDED_SCALE,
  expandedPush: EXPANDED_PUSH,
};

export function getSceneLayout(width: number, height: number): SceneLayout {
  if (width <= 0 || height <= 0) return DEFAULT_LAYOUT;

  const aspect = width / height;
  const isMobile = width < 640;
  const isPortrait = aspect < 1;

  if (!isMobile) {
    if (width < 900) {
      return {
        ...DEFAULT_LAYOUT,
        fov: 44,
        spacingScale: 0.88,
        expandedScale: 1.85,
      };
    }
    return DEFAULT_LAYOUT;
  }

  if (isPortrait) {
    return {
      fov: 50,
      cameraDistanceScale: 0.92,
      spacingScale: 1.25,
      cubeBackScale: 0.82,
      arrangement: "vertical",
      expandedScale: 1.45,
      expandedPush: 0.65,
    };
  }

  return {
    fov: 48,
    cameraDistanceScale: 0.9,
    spacingScale: 1.1,
    cubeBackScale: 0.82,
    arrangement: "vertical",
    expandedScale: 1.6,
    expandedPush: 0.8,
  };
}
