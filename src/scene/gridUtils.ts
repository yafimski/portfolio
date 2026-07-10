import {
  PerspectiveCamera,
  Plane,
  Raycaster,
  Vector3,
} from "three";

const PLANE = new Plane(new Vector3(0, 1, 0), 0);
const RAYCASTER = new Raycaster();
const HIT = new Vector3();
const NDC = new Vector3();

/** Half-width of a square grid that covers the camera view at a given Y plane. */
export function getGridExtent(camera: PerspectiveCamera, planeY: number): number {
  PLANE.constant = -planeY;
  let extent = 0;

  for (let x = -1; x <= 1; x += 0.25) {
    for (let y = -1; y <= 1; y += 0.25) {
      NDC.set(x, y, 0.5).unproject(camera);
      const direction = NDC.sub(camera.position).normalize();
      RAYCASTER.set(camera.position, direction);
      const hit = RAYCASTER.ray.intersectPlane(PLANE, HIT);
      if (hit) {
        extent = Math.max(extent, Math.abs(hit.x), Math.abs(hit.z));
      }
    }
  }

  return extent * 1.1;
}
