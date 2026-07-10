import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import type { Project } from "../projects/types";
import { CameraSetup } from "./CameraSetup";
import { IsoGrid } from "./IsoGrid";
import { ProjectCubes, type ProjectCubesHandle } from "./ProjectCubes";
import { CAMERA_FOV, CAMERA_POSITION } from "./sceneConfig";

type StudioSceneProps = {
  cubeRef: React.RefObject<ProjectCubesHandle | null>;
  onProjectExpand: (project: Project) => void;
  onProjectCollapse: () => void;
};

function SceneContent({
  cubeRef,
  onProjectExpand,
  onProjectCollapse,
}: StudioSceneProps) {
  return (
    <>
      <color attach="background" args={["#08080c"]} />
      <fog attach="fog" args={["#08080c", 8, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.25} color="#6688cc" />

      <IsoGrid />

      <CameraSetup />

      <ProjectCubes
        ref={cubeRef}
        onProjectExpand={onProjectExpand}
        onProjectCollapse={onProjectCollapse}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
    </>
  );
}

export function StudioScene({
  cubeRef,
  onProjectExpand,
  onProjectCollapse,
}: StudioSceneProps) {
  return (
    <Canvas
      className="h-full w-full touch-none"
      camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false }}
    >
      <Suspense fallback={null}>
        <SceneContent
          cubeRef={cubeRef}
          onProjectExpand={onProjectExpand}
          onProjectCollapse={onProjectCollapse}
        />
      </Suspense>
    </Canvas>
  );
}
