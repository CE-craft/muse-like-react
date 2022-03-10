import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Cylinder } from "@react-three/drei";

const CylinderBase = ({ position }) => {
  const cylinder = useRef();

  return (
    <Cylinder ref={cylinder} position={position} args={[2, 2, 1, 20]}>
      <meshStandardMaterial attach="material" color="#101010" />
    </Cylinder>
  );
};

export default CylinderBase;
