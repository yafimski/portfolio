import { Text, useTexture } from "@react-three/drei";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useRef, type RefObject } from "react";
import { DoubleSide, MeshStandardMaterial } from "three";
import { CUBE_SIZE } from "./faceConfig";

type CubeFaceProps = {
  faceIndex: number;
  position: [number, number, number];
  rotation: [number, number, number];
  thumbnail: string;
  isPlaceholder: boolean;
  placeholderLabel?: string;
  isHovered: boolean;
  isExpanded: boolean;
  textureOpacityRef: RefObject<number>;
  onPointerOver: (faceIndex: number) => void;
  onPointerOut: () => void;
  onPointerDown: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (faceIndex: number) => void;
};

export function CubeFace(props: CubeFaceProps) {
  if (props.isPlaceholder) {
    return <PlaceholderFace {...props} />;
  }
  return <TexturedFace {...props} />;
}

function PlaceholderFace({
  faceIndex,
  position,
  rotation,
  placeholderLabel = "Soon",
  isHovered,
  isExpanded,
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onClick,
}: CubeFaceProps) {
  const materialRef = useRef<MeshStandardMaterial>(null);

  useFrame(() => {
    if (!materialRef.current) return;
    const target = isHovered && !isExpanded ? 0.25 : 0.06;
    materialRef.current.emissiveIntensity +=
      (target - materialRef.current.emissiveIntensity) * 0.15;
  });

  return (
    <mesh
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver(faceIndex);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerOut();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(faceIndex);
      }}
    >
      <planeGeometry args={[CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#14141c"
        emissive="#445566"
        emissiveIntensity={0.06}
        roughness={0.8}
        metalness={0.05}
        side={DoubleSide}
      />
      <Text
        position={[0, 0, 0.02]}
        fontSize={placeholderLabel.length > 8 ? 0.18 : 0.28}
        maxWidth={1.35}
        textAlign="center"
        color="#8899aa"
        anchorX="center"
        anchorY="middle"
      >
        {placeholderLabel}
      </Text>
    </mesh>
  );
}

function TexturedFace({
  faceIndex,
  position,
  rotation,
  thumbnail,
  isHovered,
  isExpanded,
  textureOpacityRef,
  onPointerOver,
  onPointerOut,
  onPointerDown,
  onClick,
}: CubeFaceProps) {
  const materialRef = useRef<MeshStandardMaterial>(null);
  const texture = useTexture(thumbnail);

  useFrame(() => {
    if (!materialRef.current) return;
    const target = isHovered && !isExpanded ? 0.35 : 0;
    materialRef.current.emissiveIntensity +=
      (target - materialRef.current.emissiveIntensity) * 0.15;
    materialRef.current.opacity = textureOpacityRef.current ?? 1;
  });

  return (
    <mesh
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver(faceIndex);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onPointerOut();
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPointerDown(e);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(faceIndex);
      }}
    >
      <planeGeometry args={[CUBE_SIZE, CUBE_SIZE]} />
      <meshStandardMaterial
        ref={materialRef}
        map={texture}
        emissive="#88aaff"
        emissiveIntensity={0}
        transparent
        opacity={1}
        side={DoubleSide}
        roughness={0.55}
        metalness={0.08}
      />
    </mesh>
  );
}
