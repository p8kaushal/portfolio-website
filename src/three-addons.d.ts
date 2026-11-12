// The existing JS world injects the untyped Three namespace. Describe only the
// addon boundaries used here; application logic remains checked by checkJs.
declare module 'three/addons/geometries/RoundedBoxGeometry.js' {
  export const RoundedBoxGeometry: new (width: number, height: number, depth: number, segments: number, radius: number) => any;
}
declare module 'three/addons/utils/BufferGeometryUtils.js' {
  export function mergeGeometries(geometries: any[], useGroups?: boolean): any;
}
