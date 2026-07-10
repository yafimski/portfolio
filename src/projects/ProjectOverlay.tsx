import { faUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "../shared";
import type { Project } from "./types";

type ProjectOverlayProps = {
  project: Project;
  visible: boolean;
  onClose: () => void;
};

export function ProjectOverlay({
  project,
  visible,
  onClose,
}: ProjectOverlayProps) {
  if (!visible) return null;

  return (
    <div
      className="overlay-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="overlay-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-${project.id}-title`}
      >
        <button
          type="button"
          className="overlay-close"
          onClick={onClose}
          aria-label="Close project"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <header className="overlay-header">
          <h1 id={`project-${project.id}-title`} className="overlay-title">
            <b>{project.title}</b>
            {project.liveUrl && (
              <ExternalLink
                className="ml-3 text-blue-400"
                href={project.liveUrl}
              >
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </ExternalLink>
            )}
          </h1>
          <p className="overlay-subtitle">{project.subtitle}</p>
        </header>

        <div className="overlay-body">
          <div className="overlay-description">{project.description}</div>

          {project.media?.type === "video" && (
            <video
              className={
                project.media.aspect === "landscape"
                  ? "overlay-video-landscape"
                  : "overlay-video-portrait"
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

          {project.media?.type === "youtube" && (
            <iframe
              className="overlay-youtube"
              src={`https://www.youtube.com/embed/${project.media.videoId}`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}

          {project.media?.type === "gif" && (
            <img
              className="overlay-gif"
              src={project.media.src}
              alt={project.title}
            />
          )}

          {project.media?.type === "images" && (
            <div className="overlay-gallery">
              {project.media.srcs.map((src) => (
                <img key={src} src={src} alt={project.title} />
              ))}
            </div>
          )}

          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="overlay-gallery">
              {project.galleryImages.map((src) => (
                <img key={src} src={src} alt={project.title} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
