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
    const overlayPinnedRef = useRef(false);
    const navigationGenerationRef = useRef(0);
    const pendingNavigationRef = useRef<Project | null>(null);
    const isCrossCubeTransitioningRef = useRef(false);
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
        if (overlayPinnedRef.current) {
          overlayOpacityRef.current = 1;
        } else {
          const active = activeCubeRef.current;
          overlayOpacityRef.current =
            active === null
              ? 0
              : (cubeRefs.current[active]?.overlayOpacityRef.current ?? 0);
        }
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
      if (overlayPinnedRef.current || isCrossCubeTransitioningRef.current) {
        return;
      }
      activeCubeRef.current = null;
      setLockedCubeIndex(null);
      onProjectCollapse();
    };

    const navigateLogicRef = useRef<(project: Project) => void>(() => {});
    navigateLogicRef.current = (project: Project) => {
      const active = activeCubeRef.current;
      const targetCube = project.cubeIndex;
      const target = cubeRefs.current[targetCube];
      if (!target) return;

      if (active === targetCube) {
        isCrossCubeTransitioningRef.current = false;
        overlayPinnedRef.current = true;
        target.navigateToFace(project.faceIndex);
        return;
      }

      if (active !== null) {
        overlayPinnedRef.current = true;

        if (isCrossCubeTransitioningRef.current) {
          return;
        }

        isCrossCubeTransitioningRef.current = true;
        const generation = navigationGenerationRef.current;
        const collapsingCube = active;

        cubeRefs.current[collapsingCube]?.collapse(() => {
          const latest = pendingNavigationRef.current;

          if (generation !== navigationGenerationRef.current) {
            isCrossCubeTransitioningRef.current = false;
            if (latest) navigateLogicRef.current(latest);
            return;
          }

          if (!latest) {
            isCrossCubeTransitioningRef.current = false;
            overlayPinnedRef.current = false;
            return;
          }

          activeCubeRef.current = latest.cubeIndex;
          setLockedCubeIndex(latest.cubeIndex);
          const expandTarget = cubeRefs.current[latest.cubeIndex];
          if (!expandTarget) {
            isCrossCubeTransitioningRef.current = false;
            overlayPinnedRef.current = false;
            return;
          }

          expandTarget.expandFace(latest.faceIndex, () => {
            if (generation !== navigationGenerationRef.current) {
              isCrossCubeTransitioningRef.current = false;
              const newer = pendingNavigationRef.current;
              if (newer) navigateLogicRef.current(newer);
              return;
            }

            overlayPinnedRef.current = false;
            isCrossCubeTransitioningRef.current = false;
          });
        });
        return;
      }

      target.expandFace(project.faceIndex);
    };

    useImperativeHandle(ref, () => ({
      collapse: () => {
        overlayPinnedRef.current = false;
        isCrossCubeTransitioningRef.current = false;
        pendingNavigationRef.current = null;
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
        navigationGenerationRef.current += 1;
        pendingNavigationRef.current = project;
        navigateLogicRef.current(project);
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
