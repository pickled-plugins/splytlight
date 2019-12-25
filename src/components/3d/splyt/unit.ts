import { CylinderGeometry, Geometry, Mesh, MeshLambertMaterial } from "three";

import { Geometry as SplytGeometry } from "../../../splyt";

const { sin, cos } = Math;

const createCylinder = (length: number, radius: number) =>
  new CylinderGeometry(radius, radius, length, 24, 8, false);

const createArm = (
  {
    length,
    angle
  }: {
    length: number;
    angle: number;
  },
  baseHeight: number,
  radius: number
) => {
  const obj = createCylinder(length, radius);
  obj.rotateZ(angle);
  obj.translate(
    (-length * sin(angle)) / 2,
    baseHeight + (length * cos(angle)) / 2,
    0
  );
  return obj;
};

const o = 1;

const material = new MeshLambertMaterial({
  color: 0x4a76b2
});

export default function createSplytUnit(size: SplytGeometry) {
  const { baseHeight, radius, leftArm, rightArm } = size;

  const baseObj = createCylinder(baseHeight - o, radius);
  baseObj.translate(0, baseHeight / 2 + o, 0);

  const leftArmObj = createArm(leftArm, baseHeight, radius);
  const rightArmObj = createArm(rightArm, baseHeight, radius);

  const geometryAccumulator = new Geometry();
  [baseObj, leftArmObj, rightArmObj].forEach(object =>
    geometryAccumulator.merge(object)
  );

  return new Mesh(geometryAccumulator, material);
}
