/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.gltf -T --shadows
Author: tommybrt (https://sketchfab.com/tommybrt)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/question-mark-00962764566840499ee2f8ad0b66e073
Title: Question Mark
*/

import React, { forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { GroupProps } from "@react-three/fiber";

export const QMark = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF(
    "/models/question_mark/scene-transformed.glb"
  ) as any;
  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Torus002_Material001_0.geometry}
        material={materials["Material.001"]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});
useGLTF.preload("/models/question_mark/scene-transformed.glb");
