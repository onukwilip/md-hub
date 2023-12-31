/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.gltf -T --shadows
Author: UL (https://sketchfab.com/unmanned.lifemail)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/question-mark-e0969716da6c4168a1d98067be48769a
Title: question mark
*/

import React, { useRef, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { GroupProps } from "@react-three/fiber";

export const QMark1 = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF(
    "/models/question_mark (1)/scene-transformed.glb"
  ) as any;
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.Digital_blue_2}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

useGLTF.preload("/models/question_mark (1)/scene-transformed.glb");
