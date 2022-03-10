import VideoShaderMaterial from "./shaders/VideoShaderMaterial";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

const VideoScreen = ({ video, position, rotation }) => {
  const screen = useRef();
  const screenBackground = useRef();

  const videoTexture = new THREE.VideoTexture(video);
  useEffect(() => {
    screen.current.uniforms.uVideoTexture.value = videoTexture;
    screen.current.visible = true;
  });
  useFrame((state) => {
    screen.current.uniforms.uTime.value = state.clock.getElapsedTime();
    screen.current.transparent = true;
    screen.current.blending = THREE.AdditiveBlending;
    screen.current.depthWrite = false;

    screenBackground.current.transparent = true;
    screenBackground.current.opacity = 0.2;
  });

  return (
    <group position={position}>
      <mesh>
        <planeBufferGeometry args={[4, 2.5, 1, 1]} />
        <videoShaderMaterial ref={screen} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.25]}>
        <planeBufferGeometry args={[4, 3, 1, 1]} />
        <meshStandardMaterial
          color={"red"}
          ref={screenBackground}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 1.5, -0.25]}>
        <boxBufferGeometry args={[4.4, 0.1, 0.1]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
      <rectAreaLight
        position={[0, -1.5, 0]}
        rotation={[0, Math.PI, 0]}
        width={5}
        height={2}
        intensity={10}
        color={"white"}
      />
      <mesh position={[0, -1.5, -0.25]}>
        <boxBufferGeometry args={[4.4, 0.3, 0.3]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
    </group>
  );
};

export default VideoScreen;
