import { faUpRightFromSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ExternalLink } from "../shared";
import type { Project } from "./types";

const VIDEO_ASPECT_FALLBACK = {
  portrait: 0.558,
  landscape: 1.77,
} as const;

type FaceProjectContentProps = {
  project: Project;
  onClose: () => void;
};

export function FaceProjectContent({ project, onClose }: FaceProjectContentProps) {
  const [videoAspectRatio, setVideoAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    setVideoAspectRatio(null);
  }, [project.id]);

  const isPortraitVideo =
    project.media?.type === "video" &&
    (project.media.aspect === "portrait" ||
      (videoAspectRatio !== null && videoAspectRatio < 1));

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
        <div className="face-panel-header-row">
          {project.thumbnail && (
            <img
              className="face-panel-thumb"
              src={project.thumbnail}
              alt=""
            />
          )}
          <div className="min-w-0">
            <h1
              id={`project-${project.id}-title`}
              className="face-panel-title"
            >
              <b>{project.title}</b>
              {project.liveUrl && (
                <ExternalLink className="ml-2 text-blue-400" href={project.liveUrl}>
                  <FontAwesomeIcon icon={faUpRightFromSquare} />
                </ExternalLink>
              )}
            </h1>
            <p className="face-panel-subtitle">{project.subtitle}</p>
          </div>
        </div>
      </header>

      <div className="face-panel-body">
        <div className="face-panel-description">{project.description}</div>

        {project.media?.type === "video" && (
          <video
            className={`face-panel-video${
              isPortraitVideo ? " face-panel-video-portrait" : ""
            }`}
            style={{
              aspectRatio:
                videoAspectRatio ??
                VIDEO_ASPECT_FALLBACK[project.media.aspect ?? "landscape"],
            }}
            title={project.title}
            src={project.media.src}
            autoPlay
            loop
            muted
            controls
            playsInline
            onLoadedMetadata={(event) => {
              const { videoWidth, videoHeight } = event.currentTarget;
              if (videoWidth > 0 && videoHeight > 0) {
                setVideoAspectRatio(videoWidth / videoHeight);
              }
            }}
          />
        )}

        {project.media?.type === "youtube" && (
          <iframe
            className="face-panel-youtube"
            src={`https://www.youtube.com/embed/${project.media.videoId}`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
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
          <div
            className={`face-panel-gallery${
              project.galleryVariant === "unified" ? " face-panel-gallery--unified" : ""
            }`}
          >
            {project.galleryImages.map((src) => (
              <img key={src} src={src} alt={project.title} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
