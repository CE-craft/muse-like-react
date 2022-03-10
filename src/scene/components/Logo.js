import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { DoubleSide } from "three";

const Logo = () => {
  const logoMesh = useLoader(GLTFLoader, "/logoSoloMesh.glb");

  logoMesh.nodes.logoSoloMesh.material.color = new THREE.Color(0.5, 0, 0);
  logoMesh.nodes.logoSoloMesh.material.metalness = 0;
  logoMesh.nodes.logoSoloMesh.material.emissive = new THREE.Color(1, 0, 0);
  logoMesh.nodes.logoSoloMesh.material.emissiveIntensity = 1;
  logoMesh.nodes.logoSoloMesh.material.side = DoubleSide;

  return (
    <>
      <mesh
        position={[0.01, -0.01, -0.6]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={[0.18, 0.18, 0.18]}
        geometry={logoMesh.nodes.logoSoloMesh.geometry}
        material={logoMesh.nodes.logoSoloMesh.material}
      ></mesh>
    </>
  );
};

export default Logo;
