import { Vector3 } from "three";
import { CUBE_SIZE } from "./faceConfig";

export const IDLE_Y = 0.8;
/** Cube center Y — half a cube height below the scene anchor */
export const CUBE_Y = IDLE_Y - CUBE_SIZE / 2;
export const EXPANDED_SCALE = 2;
export const EXPANDED_PUSH = 1;

export const CAMERA_POSITION: [number, number, number] = [7, 5.5, 7];
export const CAMERA_FOV = 40;

const cameraPosition = new Vector3(...CAMERA_POSITION);
export const CAMERA_TARGET = new Vector3(0, IDLE_Y, 0);

export const CAMERA_DIRECTION = new Vector3()
  .subVectors(cameraPosition, CAMERA_TARGET)
  .normalize();

/** Unit vector pointing right in the camera's horizontal view plane. */
const cameraForward = new Vector3()
  .subVectors(CAMERA_TARGET, cameraPosition)
  .setY(0)
  .normalize();
export const CAMERA_RIGHT = new Vector3()
  .crossVectors(cameraForward, new Vector3(0, 1, 0))
  .normalize();

/** How far the cube sits back from the origin (away from camera). */
export const CUBE_BACK = 1.5;

export const CUBE_OFFSET = new Vector3(
  -CAMERA_DIRECTION.x,
  0,
  -CAMERA_DIRECTION.z,
)
  .normalize()
  .multiplyScalar(CUBE_BACK);

export const EXPANDED_OFFSET = CAMERA_DIRECTION
  .clone()
  .multiplyScalar(EXPANDED_PUSH);

export const CUBE_COUNT = 2;
/** Center-to-center distance between adjacent cubes. */
export const CUBE_SPACING = CUBE_SIZE * 2.4;

export function getCubeLateralOffset(
  cubeIndex: number,
  cubeCount = CUBE_COUNT,
) {
  return (cubeIndex - (cubeCount - 1) / 2) * CUBE_SPACING;
}

export function getCubeBaseOffset(cubeIndex: number) {
  const lateral = getCubeLateralOffset(cubeIndex);
  return CUBE_OFFSET.clone().add(
    CAMERA_RIGHT.clone().multiplyScalar(lateral),
  );
}
