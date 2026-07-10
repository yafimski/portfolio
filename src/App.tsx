import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";
import { Social } from "./layout";
import { PROJECTS } from "./projects";
import { ScreenProjectPanel } from "./projects/ScreenProjectPanel";
import type { Project } from "./projects/types";
import { StudioScene } from "./scene/StudioScene";
import type { ProjectCubesHandle } from "./scene/ProjectCubes";
import "./index.css";

function App() {
  const cubeRef = useRef<ProjectCubesHandle>(null);
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);
  const expandedProjectRef = useRef<Project | null>(null);
  expandedProjectRef.current = expandedProject;

  const handleProjectExpand = useCallback((project: Project) => {
    setExpandedProject(project);
  }, []);

  const handleClose = useCallback(() => {
    cubeRef.current?.collapse();
  }, []);

  const handleProjectCollapse = useCallback(() => {
    setExpandedProject(null);
  }, []);

  const handleReset = useCallback(() => {
    cubeRef.current?.goHome();
  }, []);

  const handleNavigateProject = useCallback((direction: -1 | 1) => {
    const current = expandedProjectRef.current;
    if (!current || PROJECTS.length === 0) return;

    const currentIndex = PROJECTS.findIndex(
      (project) => project.id === current.id,
    );
    if (currentIndex === -1) return;

    const nextIndex =
      (currentIndex + direction + PROJECTS.length) % PROJECTS.length;
    const nextProject = PROJECTS[nextIndex];
    if (!nextProject) return;

    cubeRef.current?.navigateToProject(nextProject);
    setExpandedProject(nextProject);
  }, []);

  const resetBtnRef = useRef<HTMLButtonElement>(null);

  const getOpacityRef = useCallback(
    () => cubeRef.current?.overlayOpacityRef ?? null,
    [],
  );

  useEffect(() => {
    const btn = resetBtnRef.current;
    if (!btn) return;

    if (!expandedProject) {
      btn.style.opacity = "";
      btn.style.filter = "";
      btn.style.pointerEvents = "";
      return;
    }

    let frame = 0;

    const tick = () => {
      const opacityRef = getOpacityRef();
      const overlayOpacity = opacityRef?.current ?? 0;

      btn.style.opacity = String(1 - overlayOpacity * 0.75);
      btn.style.filter =
        overlayOpacity > 0 ? `blur(${overlayOpacity * 3}px)` : "none";
      btn.style.pointerEvents = overlayOpacity > 0.35 ? "none" : "auto";

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [expandedProject, getOpacityRef]);

  useEffect(() => {
    if (!expandedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select, video"))
      ) {
        return;
      }

      if (e.key === "<" || e.key === "ArrowLeft") {
        e.preventDefault();
        handleNavigateProject(-1);
      } else if (e.key === ">" || e.key === "ArrowRight") {
        e.preventDefault();
        handleNavigateProject(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedProject, handleNavigateProject]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#08080c]">
      <StudioScene
        cubeRef={cubeRef}
        onProjectExpand={handleProjectExpand}
        onProjectCollapse={handleProjectCollapse}
      />

      <img
        src="/ys_logo.webp"
        alt="YS"
        className="ys-logo pointer-events-none fixed top-6 left-6 z-40 h-48 sm:top-8 sm:left-8"
      />

      <button
        ref={resetBtnRef}
        type="button"
        className="reset-btn"
        onClick={handleReset}
        aria-label="Reset cube position"
        title="Reset position"
      >
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </button>

      <header className="pointer-events-auto fixed top-0 right-0 z-40 m-6 flex gap-2 sm:m-8">
        <Social
          link="https://www.linkedin.com/in/yafimsimanovsky/"
          icon={faLinkedin}
        />
        <Social link="https://github.com/yafimski" icon={faGithub} />
      </header>

      {expandedProject && (
        <>
          <div
            className="scene-backdrop"
            onClick={handleClose}
            role="presentation"
            aria-hidden="true"
          />
          <ScreenProjectPanel
            project={expandedProject}
            getOpacityRef={getOpacityRef}
            onClose={handleClose}
          />
        </>
      )}

      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3">
        {!expandedProject ? (
          <p className="text-xs tracking-widest text-neutral-500 uppercase">
            Drag to rotate · Click a face to explore
          </p>
        ) : (
          <>
            <button
              type="button"
              className="project-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateProject(-1);
              }}
              aria-label="Previous project"
            >
              &lt;
            </button>
            <button
              type="button"
              className="project-nav-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigateProject(1);
              }}
              aria-label="Next project"
            >
              &gt;
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
