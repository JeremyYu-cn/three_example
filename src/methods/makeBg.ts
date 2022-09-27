import { CubeTextureLoader } from "three";

export function makeBackground(bgArr: string[]) {
  return new CubeTextureLoader()
    .setPath("https://img.yzmblog.top/threejs/yokohama/")
    .load(bgArr);
}
