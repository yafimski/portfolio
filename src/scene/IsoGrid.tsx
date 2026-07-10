import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import {
  DoubleSide,
  PerspectiveCamera,
  ShaderMaterial,
} from "three";
import { CUBE_SIZE } from "./faceConfig";
import { getGridExtent } from "./gridUtils";
import { IDLE_Y } from "./sceneConfig";

/** Horizontal floor plane one cube size below the cube bottom */
export const GRID_Y = IDLE_Y - CUBE_SIZE / 2 - CUBE_SIZE;

/** World size of one grid tile */
const CELL_SIZE = 0.4;
/** Tiles from center to each edge */
const MIN_HALF_CELLS = 3;
const MAX_HALF_CELLS = 10;

const GRID_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GRID_FRAGMENT = /* glsl */ `
  varying vec2 vUv;
  uniform float halfCells;

  void main() {
    vec2 pos = (vUv - 0.5) * 2.0;
    float edge = max(abs(pos.x), abs(pos.y));

    if (edge > 1.0) discard;

    vec2 gridPos = pos * halfCells;
    vec2 grid = abs(fract(gridPos) - 0.5);
    float tile = 1.0 - smoothstep(0.0, 0.028, min(grid.x, grid.y));

    float axisX = (1.0 - smoothstep(0.0, 0.012, abs(pos.x))) * 0.35;
    float axisZ = (1.0 - smoothstep(0.0, 0.012, abs(pos.y))) * 0.35;
    float line = max(tile, max(axisX, axisZ)) * 0.5;

    float outwardFade = 1.0 - smoothstep(0.5, 1.0, edge);

    if (line * outwardFade < 0.004) discard;
    gl_FragColor = vec4(vec3(outwardFade * 0.32), line * outwardFade);
  }
`;

function snapGridHalfCells(viewExtent: number) {
  const halfCells = Math.round(viewExtent / CELL_SIZE);
  return Math.min(MAX_HALF_CELLS, Math.max(MIN_HALF_CELLS, halfCells));
}

export function IsoGrid() {
  const { camera, size } = useThree();

  const { extent, halfCells } = useMemo(() => {
    if (!(camera instanceof PerspectiveCamera)) {
      return { extent: MIN_HALF_CELLS * CELL_SIZE, halfCells: MIN_HALF_CELLS };
    }
    camera.updateProjectionMatrix();
    const viewExtent = getGridExtent(camera, GRID_Y);
    const cells = snapGridHalfCells(viewExtent);
    return { extent: cells * CELL_SIZE, halfCells: cells };
  }, [camera, size.width, size.height]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { halfCells: { value: halfCells } },
        vertexShader: GRID_VERTEX,
        fragmentShader: GRID_FRAGMENT,
        transparent: true,
        depthWrite: false,
        side: DoubleSide,
      }),
    [halfCells],
  );

  return (
    <group position={[0, GRID_Y, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={material}>
        <planeGeometry args={[extent * 2, extent * 2]} />
      </mesh>
    </group>
  );
}
