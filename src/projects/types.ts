import type { ReactNode } from "react";

export type ProjectMedia =
  | { type: "video"; src: string; aspect?: "portrait" | "landscape" }
  | { type: "gif"; src: string }
  | { type: "images"; srcs: string[] }
  | { type: "youtube"; videoId: string };

export type Project = {
  id: string;
  cubeIndex: number;
  faceIndex: number;
  thumbnail?: string;
  title: string;
  subtitle: string;
  description: ReactNode;
  liveUrl?: string;
  media?: ProjectMedia;
  galleryImages?: string[];
  galleryVariant?: "unified";
};

export type CubeFaceData = {
  cubeIndex: number;
  faceIndex: number;
  thumbnail: string;
  project: Project | null;
  isPlaceholder: boolean;
  placeholderLabel?: string;
};
