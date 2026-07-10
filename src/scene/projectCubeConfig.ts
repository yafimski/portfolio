import { Quaternion } from "three";

export const DRAG_THRESHOLD = 5;
export const IDLE_SPIN = 0.15;
export const BOB_SPEED = 1.2;
export const BOB_AMPLITUDE = 0.18;
export const DRAG_Y_SENS = 0.008;
export const DRAG_X_SENS = 0.004;
export const MOMENTUM_FRICTION = 0.92;
export const MIN_ANGULAR_SPEED = 0.02;
export const VELOCITY_SMOOTH = 0.35;
export const DEFAULT_QUATERNION = new Quaternion();
export const RESET_DURATION = 1.5;

export function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
