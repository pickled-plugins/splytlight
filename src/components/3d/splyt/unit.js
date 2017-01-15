import {
  CylinderGeometry,
  Geometry,
  SceneUtils,
  SmoothShading,
  MeshLambertMaterial
} from 'three'

const { sin, cos } = Math

function createCylinder (length, radius) {
  return new CylinderGeometry(radius, radius, length, 24, 8, false)
}

function createArm ({length, angle}, baseHeight, radius) {
  const obj = createCylinder(length, radius)
  obj.rotateZ(angle)
  obj.translate(
    -length * sin(angle) / 2,
    baseHeight + length * cos(angle) / 2,
    0
  )
  return obj
}

export default function createSplytUnit (size) {
  const { baseHeight, radius, leftArm, rightArm } = size

  const baseObj = createCylinder(baseHeight, radius)
  baseObj.translate(0, baseHeight / 2, 0)

  const leftArmObj = createArm(leftArm, baseHeight, radius)
  const rightArmObj = createArm(rightArm, baseHeight, radius)

  const materials = [
    new MeshLambertMaterial({
      color: 0xFFF9DC,
      shading: SmoothShading
    })
  ]

  const smallYGeo = new Geometry();
  [ baseObj, leftArmObj, rightArmObj ].forEach(o => smallYGeo.merge(o, o.matrix))

  const smallYMesh = SceneUtils.createMultiMaterialObject(smallYGeo, materials)

  return smallYMesh
}
