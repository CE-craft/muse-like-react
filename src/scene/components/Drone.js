import Logo from "./Logo";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

export default function Drone(props) {
  const group = useRef();
  const sentinel = useRef();
  const ring = useRef();
  const { nodes, materials } = useGLTF("/DroneLabledFix01.glb");

  const bakedTexture = useLoader(TextureLoader, "/baked3.jpg");
  bakedTexture.flipY = false;
  bakedTexture.encoding = THREE.sRGBEncoding;

  const textureMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

  // Ring Material
  nodes.mainRing.material.metalness = 0;
  nodes.mainRing.material.color = new THREE.Color(1, 1, 1);
  nodes.mainRing.material.emissive = new THREE.Color(1, 1, 1);
  nodes.mainRing.material.emissiveIntensity = 4;

  return (
    <group ref={sentinel}>
      <group
        ref={group}
        {...props}
        dispose={null}
        rotation={props.rotation}
        position={props.position}
        scale={1}
      >
        <mesh
          geometry={nodes.sideLazerGlass.geometry}
          material={textureMaterial}
          position={[0.01, 0, 0.09]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.headLazerGlass.geometry}
          material={textureMaterial}
          position={[0.01, 0, 0.09]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <mesh
          geometry={nodes.head_lazers003.geometry}
          material={textureMaterial}
          position={[-0.16, 0.71, -0.32]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.55, 0.55, 0.55]}
        />

        <mesh
          geometry={nodes.sideBottomLazer.geometry}
          material={textureMaterial}
          position={[-0.78, -0.3, -0.05]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.91, 0.91, 0.91]}
        />

        <Logo />

        <mesh
          geometry={nodes.mainBody.geometry}
          material={textureMaterial}
          position={[0.01, 0, 0.09]}
          rotation={[Math.PI / 2, 0, 0]}
        />

        <mesh
          geometry={nodes.sideTopLazer.geometry}
          material={textureMaterial}
          position={[-0.79, -0.2, -0.05]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.91, 0.91, 0.91]}
        />

        <mesh
          geometry={nodes.bottomLazerGlass.geometry}
          material={textureMaterial}
          position={[0.01, 0, 0.08]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={nodes.bottomLazer.geometry}
          material={textureMaterial}
          position={[0.02, -0.88, -0.25]}
          rotation={[0.7, 0, 0]}
          scale={[0.89, 0.62, 0.47]}
        />
        <mesh
          ref={ring}
          geometry={nodes.mainRing.geometry}
          material={nodes.mainRing.material}
          position={[0.01, -0.01, -0.6]}
          rotation={[-Math.PI / 2, -0.09, 0]}
          scale={[0.2, 0.2, 0.2]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/DroneLabledFix01.glb");
