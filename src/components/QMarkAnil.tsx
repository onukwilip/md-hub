/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.3 scene.gltf -T --shadows
Author: aniljaco (https://sketchfab.com/aniljaco)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/quest-mark---anil-4cd9262e941e48c997715dcfeff27e6d
Title: Quest mark _ Anil
*/

import React, { FC, forwardRef, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Group } from "three";

export const QMarkAnil = forwardRef<Group, GroupProps>((props, ref) => {
  const { nodes, materials } = useGLTF(
    "/models/quest_mark___anil/scene-transformed.glb"
  ) as any;
  return (
    <group {...props} dispose={null} ref={ref}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials["Material.001"]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

useGLTF.preload("/models/quest_mark___anil/scene-transformed.glb");
