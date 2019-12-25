import { Group, SphereGeometry, MeshLambertMaterial, Mesh } from "three";

import { part, Geometry } from "../../../splyt";
import { Dir, Tree } from "../../../state";
import createSplytUnit from "./unit";

const { sin, cos } = Math;

const transformSplyt = (
  object: Group,
  dimensions: Geometry,
  dir: Dir,
  rotation: number
) => {
  const { baseHeight } = dimensions;
  const { angle, length } =
    dir === "left" ? dimensions.leftArm : dimensions.rightArm;
  object.rotateZ(angle);
  object.rotateY(rotation);
  object.position.set(
    -length * sin(angle),
    baseHeight + length * cos(angle),
    0
  );
};

const createSplytTree = (state: Tree | null): Group => {
  if (!state || state.status === "adding") {
    const emptyGroup = new Group();
    const sphereGeometry = new SphereGeometry(12, 16, 16);
    const sphereMaterial = new MeshLambertMaterial({ color: 0xefd439 });
    const sphereMesh = new Mesh(sphereGeometry, sphereMaterial);
    sphereMesh.translateY(13);
    emptyGroup.add(sphereMesh);
    return emptyGroup;
  } else {
    const leftGroup = createSplytTree(state.left);
    const splytPart = part(state.size);
    transformSplyt(leftGroup, splytPart, "left", state.rotation);
    const rightGroup = createSplytTree(state.right);
    transformSplyt(rightGroup, splytPart, "right", state.rotation);
    const group = new Group();
    group.add(leftGroup);
    group.add(rightGroup);
    group.add(createSplytUnit(splytPart));
    return group;
  }
};

export default createSplytTree;
