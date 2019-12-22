import { controlCircleOffset } from "./styles/vars";

export interface Geometry {
  baseHeight: number;
  radius: number;
  leftArm: {
    length: number;
    angle: number;
  };
  rightArm: {
    length: number;
    angle: number;
  };
}

export type Size = "small" | "large";

export const small: Geometry = {
  baseHeight: 30,
  radius: 9.25,
  leftArm: {
    length: 30,
    angle: Math.PI / 6
  },
  rightArm: {
    length: 40,
    angle: -Math.PI / 6
  }
};

export const large: Geometry = {
  baseHeight: 70,
  radius: 9.25,
  leftArm: {
    length: 80,
    angle: Math.PI / 6
  },
  rightArm: {
    length: 80,
    angle: -Math.PI / 6
  }
};

export const part = (size: Size): Geometry => {
  if (size === "small") {
    return small;
  }
  return large;
};

export const getPoints = (
  { baseHeight, leftArm, rightArm }: Geometry,
  options: any
) => {
  const offset = options && options.useOffset ? controlCircleOffset : 0;
  return {
    left: {
      x: (leftArm.length - offset / 2) * Math.sin(leftArm.angle),
      y: baseHeight + (leftArm.length - offset / 2) * Math.cos(leftArm.angle)
    },
    right: {
      x: (rightArm.length - offset / 2) * Math.sin(rightArm.angle),
      y: baseHeight + (rightArm.length - offset / 2) * Math.cos(rightArm.angle)
    },
    mid: {
      x: 0,
      y: baseHeight
    },
    start: {
      x: 0,
      y: offset / 2
    }
  };
};

export const getEndPoints = (
  { baseHeight, leftArm, rightArm }: Geometry,
  options: any
) => {
  const offset = options && options.useOffset ? controlCircleOffset : 0;
  return [
    {
      x: (leftArm.length - offset / 2) * Math.sin(leftArm.angle),
      y: baseHeight + (leftArm.length - offset / 2) * Math.cos(leftArm.angle)
    },
    {
      x: (rightArm.length - offset / 2) * Math.sin(rightArm.angle),
      y: baseHeight + (rightArm.length - offset / 2) * Math.cos(rightArm.angle)
    }
  ];
};

export const getStartPoint = ({ baseHeight }: Geometry, options: any) => {
  const offset = options && options.useOffset ? controlCircleOffset : 0;
  return {
    x: 0,
    y: offset / 2
  };
};

export const getMidPoint = ({ baseHeight }: any) => {
  return {
    x: 0,
    y: baseHeight
  };
};

export const countUnits = (tree: any): number => {
  if (!tree || ["added", "removing"].indexOf(tree.status) === -1) {
    return 0;
  }
  return 1 + countUnits(tree.left) + countUnits(tree.right);
};

export const countLooseEnds = (tree: any): number => {
  if (!tree || ["added", "removing"].indexOf(tree.status) === -1) {
    return 1;
  }
  return countLooseEnds(tree.left) + countLooseEnds(tree.right);
};