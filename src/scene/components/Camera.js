import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { useFPSController } from "../controls/FPSControllerHooks";
import { useCustomComposer } from "../../helpers/postprocessing";

extend({ PointerLockControls });

const Camera = ({ position, rotation }) => {
  const mainCamera = useRef();
  const controls = useRef();

  //useCustomComposer();

  const { camera, gl } = useThree();
  useFPSController(controls);

  useEffect(() => {
    document.addEventListener("click", () => {
      controls.current.lock();
    });
  }, []);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={mainCamera}
        position={position}
        rotation={rotation}
        far={100}
        near={0.1}
        fov={40}
        onUpdate={(self) => self.updateProjectionMatrix()}
      />
      <pointerLockControls args={[camera, gl.domElement]} ref={controls} />
    </>
  );
};

export default Camera;
