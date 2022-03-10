import OverlayShaderMaterial from "./shaders/OverlayShaderMaterial";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const LoadingOverlay = () => {
  const overlay = useRef();

  useFrame(() => {
    overlay.current.transparent = true;
  });
  return (
    <mesh ref={overlay}>
      <planeBufferGeometry args={[2, 2, 1, 1]} />
      <overlayShaderMaterial />
    </mesh>
  );
};

export default LoadingOverlay;
