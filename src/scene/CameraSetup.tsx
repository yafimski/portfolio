import { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CAMERA_TARGET } from "./sceneConfig";

export function CameraSetup() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.lookAt(CAMERA_TARGET);
    camera.updateProjectionMatrix();
  }, [camera]);

  return null;
}
