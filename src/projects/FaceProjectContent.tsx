import { faUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "../shared";
import type { Project } from "./types";

type FaceProjectContentProps = {
  project: Project;
  onClose: () => void;
};

export function FaceProjectContent({ project, onClose }: FaceProjectContentProps) {
  return (
    <div className="face-panel" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className="face-panel-close"
        onClick={onClose}
        aria-label="Close project"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <header className="face-panel-header">
        <h1 className="face-panel-title">
          <b>{project.title}</b>
          {project.liveUrl && (
            <ExternalLink className="ml-2 text-blue-400" href={project.liveUrl}>
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </ExternalLink>
          )}
        </h1>
        <p className="face-panel-subtitle">{project.subtitle}</p>
      </header>

      <div className="face-panel-body">
        <div className="face-panel-description">{project.description}</div>

        {project.media?.type === "video" && (
          <video
            className={
              project.media.aspect === "landscape"
                ? "face-panel-video-landscape"
                : "face-panel-video-portrait"
            }
            title={project.title}
            src={project.media.src}
            autoPlay
            loop
            muted
            controls
            playsInline
          />
        )}

        {project.media?.type === "gif" && (
          <img
            className="face-panel-gif"
            src={project.media.src}
            alt={project.title}
          />
        )}

        {project.media?.type === "images" && (
          <div className="face-panel-gallery">
            {project.media.srcs.map((src) => (
              <img key={src} src={src} alt={project.title} />
            ))}
          </div>
        )}

        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="face-panel-gallery">
            {project.galleryImages.map((src) => (
              <img key={src} src={src} alt={project.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
