import { MeshReflectorMaterial } from "@react-three/drei";

const Walls = () => {
  return (
    <group>
      <mesh position={[0, 1, -15]}>
        <planeBufferGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
      <mesh position={[0, 1, 15]} rotation={[0, Math.PI, 0]}>
        <planeBufferGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>

      <mesh position={[-25, 1, 0]} rotation={[0, Math.PI * 0.5, 0]}>
        <planeBufferGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
      <mesh position={[25, 1, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
        <planeBufferGeometry args={[100, 100, 1, 1]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
      <mesh position={[0, 50, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <planeBufferGeometry args={[50, 50, 1, 1]} />
        <meshStandardMaterial color={"#101010"} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI * 0.5, 0, 0]}>
        <planeBufferGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0}
        />
      </mesh>
    </group>
  );
};

export default Walls;
