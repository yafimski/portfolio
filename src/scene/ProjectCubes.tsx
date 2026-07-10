import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type RefObject,
} from "react";
import { CUBE_COUNT, getCubeFaces } from "../projects/projects.data";
import type { CubeFaceData, Project } from "../projects/types";
import { ProjectCube, type ProjectCubeHandle } from "./ProjectCube";
import { getCubeBaseOffset } from "./sceneConfig";

export type ProjectCubesHandle = {
  collapse: () => void;
  goHome: () => void;
  navigateToProject: (project: Project) => void;
  overlayOpacityRef: RefObject<number>;
};

type ProjectCubesProps = {
  onProjectExpand: (project: Project) => void;
  onProjectCollapse: () => void;
};

export const ProjectCubes = forwardRef<ProjectCubesHandle, ProjectCubesProps>(
  function ProjectCubes({ onProjectExpand, onProjectCollapse }, ref) {
    const cubeRefs = useRef<Array<ProjectCubeHandle | null>>(
      Array.from({ length: CUBE_COUNT }, () => null),
    );
    const activeCubeRef = useRef<number | null>(null);
    const overlayOpacityRef = useRef(0);
    const [lockedCubeIndex, setLockedCubeIndex] = useState<number | null>(null);
    const baseOffsetsRef = useRef(
      Array.from({ length: CUBE_COUNT }, (_, cubeIndex) =>
        getCubeBaseOffset(cubeIndex),
      ),
    );
    const facesRef = useRef<CubeFaceData[][]>(
      Array.from({ length: CUBE_COUNT }, (_, cubeIndex) =>
        getCubeFaces(cubeIndex),
      ),
    );

    useEffect(() => {
      let frame = 0;

      const tick = () => {
        const active = activeCubeRef.current;
        overlayOpacityRef.current =
          active === null
            ? 0
            : (cubeRefs.current[active]?.overlayOpacityRef.current ?? 0);
        frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }, []);

    const handleCubeExpand = (cubeIndex: number, project: Project) => {
      activeCubeRef.current = cubeIndex;
      setLockedCubeIndex(cubeIndex);
      onProjectExpand(project);
    };

    const handleCubeCollapse = () => {
      activeCubeRef.current = null;
      setLockedCubeIndex(null);
      onProjectCollapse();
    };

    useImperativeHandle(ref, () => ({
      collapse: () => {
        const active = activeCubeRef.current;
        if (active === null) return;
        cubeRefs.current[active]?.collapse();
      },
      goHome: () => {
        const active = activeCubeRef.current;
        if (active !== null) {
          cubeRefs.current[active]?.goHome();
          return;
        }

        for (const cube of cubeRefs.current) {
          cube?.resetRotation();
        }
      },
      navigateToProject: (project: Project) => {
        const active = activeCubeRef.current;
        const targetCube = project.cubeIndex;
        const target = cubeRefs.current[targetCube];
        if (!target) return;

        if (active === targetCube) {
          target.navigateToFace(project.faceIndex);
          onProjectExpand(project);
          return;
        }

        if (active !== null) {
          cubeRefs.current[active]?.collapse(() => {
            activeCubeRef.current = null;
            setLockedCubeIndex(null);
            target.expandFace(project.faceIndex);
          });
          return;
        }

        target.expandFace(project.faceIndex);
      },
      overlayOpacityRef,
    }));

    return (
      <>
        {Array.from({ length: CUBE_COUNT }, (_, cubeIndex) => (
          <ProjectCube
            key={cubeIndex}
            ref={(instance) => {
              cubeRefs.current[cubeIndex] = instance;
            }}
            cubeIndex={cubeIndex}
            faces={facesRef.current[cubeIndex]}
            baseOffset={baseOffsetsRef.current[cubeIndex]}
            isLocked={lockedCubeIndex !== null && lockedCubeIndex !== cubeIndex}
            onProjectExpand={(project) => handleCubeExpand(cubeIndex, project)}
            onProjectCollapse={handleCubeCollapse}
          />
        ))}
      </>
    );
  },
);
