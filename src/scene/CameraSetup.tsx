import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "three";
import { CAMERA_TARGET, getCameraPosition } from "./sceneConfig";
import { getSceneLayout } from "./sceneLayout";

export function CameraSetup() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return;

    const layout = getSceneLayout(size.width, size.height);
    const [x, y, z] = getCameraPosition(layout.cameraDistanceScale);

    camera.position.set(x, y, z);
    camera.fov = layout.fov;
    camera.lookAt(CAMERA_TARGET);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}
