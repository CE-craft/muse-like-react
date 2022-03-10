import ImageShaderMaterial from "./shaders/ImageShaderMaterial";
import BackgroundShaderMaterial from "./shaders/BackgroundShaderMaterial";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef, useEffect } from "react";

const ImageScreen = ({ img, position, rotation, blending }) => {
  const screen = useRef();
  const screenBackground = useRef();

  const colorMap = useLoader(TextureLoader, img);
  useEffect(() => {
    screen.current.uniforms.uColorMap.value = colorMap;
    screen.current.visible = true;
  });
  useFrame((state) => {
    //screen.current.uniforms.uTime.value = state.clock.getElapsedTime();
    screen.current.transparent = true;
    screen.current.alphaMap = colorMap;
    if (blending) screen.current.blending = THREE.AdditiveBlending;
    screen.current.depthWrite = false;
    //screen.current.alphaTest = 0.001;

    screenBackground.current.uniforms.uTime.value =
      state.clock.getElapsedTime();
    screenBackground.current.transparent = true;
    //screenBackground.current.opacity = 0.5;
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeBufferGeometry args={[1.5, 1.5, 1, 1]} />
        <imageShaderMaterial ref={screen} side={THREE.DoubleSide} />
      </mesh>
      {/* PNG BACKGROUND */}
      <mesh position={[0, 0, -0.25]}>
        <planeBufferGeometry args={[2, 3, 1, 1]} />
        <backgroundShaderMaterial
          //          color={"red"}
          ref={screenBackground}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 1.5, -0.25]}>
        <boxBufferGeometry args={[2.2, 0.1, 0.1]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
      <rectAreaLight
        position={[0, -1.5, 0]}
        rotation={[0, Math.PI, 0]}
        width={3}
        height={2}
        intensity={10}
        color={"white"}
      />
      <mesh position={[0, -1.5, -0.25]}>
        <boxBufferGeometry args={[2.2, 0.3, 0.3]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
    </group>
  );
};

export default ImageScreen;
