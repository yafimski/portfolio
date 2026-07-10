import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { FaceProjectContent } from "./FaceProjectContent";
import type { Project } from "./types";

type ScreenProjectPanelProps = {
  project: Project;
  getOpacityRef: () => RefObject<number> | null;
  onClose: () => void;
};

export function ScreenProjectPanel({
  project,
  getOpacityRef,
  onClose,
}: ScreenProjectPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const tick = () => {
      const opacityRef = getOpacityRef();
      if (panelRef.current && opacityRef) {
        const opacity = opacityRef.current ?? 0;
        panelRef.current.style.opacity = String(opacity);
        panelRef.current.style.pointerEvents = opacity > 0.35 ? "auto" : "none";
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [getOpacityRef]);

  return (
    <div
      ref={panelRef}
      className="screen-project-panel"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`project-${project.id}-title`}
    >
      <FaceProjectContent project={project} onClose={onClose} />
    </div>
  );
}
