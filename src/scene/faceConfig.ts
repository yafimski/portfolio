import type { Vector3Tuple } from "three";

export const CUBE_SIZE = 1.55;

export type FaceConfig = {
  faceIndex: number;
  position: Vector3Tuple;
  rotation: [number, number, number];
  localNormal: Vector3Tuple;
};

const half = CUBE_SIZE / 2;

export const FACE_CONFIGS: FaceConfig[] = [
  {
    faceIndex: 0,
    position: [0, 0, half],
    rotation: [0, 0, 0],
    localNormal: [0, 0, 1],
  },
  {
    faceIndex: 1,
    position: [half, 0, 0],
    rotation: [0, Math.PI / 2, 0],
    localNormal: [1, 0, 0],
  },
  {
    faceIndex: 2,
    position: [0, 0, -half],
    rotation: [0, Math.PI, 0],
    localNormal: [0, 0, -1],
  },
  {
    faceIndex: 3,
    position: [-half, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    localNormal: [-1, 0, 0],
  },
  {
    faceIndex: 4,
    position: [0, half, 0],
    rotation: [-Math.PI / 2, 0, 0],
    localNormal: [0, 1, 0],
  },
  {
    faceIndex: 5,
    position: [0, -half, 0],
    rotation: [Math.PI / 2, 0, 0],
    localNormal: [0, -1, 0],
  },
];
