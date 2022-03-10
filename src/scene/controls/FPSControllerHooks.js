import { useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { speedThreshold } from "../../helpers/functions";
import { MAX_WLK_SPD, MIN_WLK_SPD } from "../../helpers/config";

export const useFPSController = (controls) => {
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();

  const mouvments = useCharacterInput();

  const { raycaster } = useThree();
  useFrame(({ clock }) => {
    if (controls.current.isLocked === true) {
      raycaster.ray.origin.copy(controls.current.getObject().position);
      raycaster.ray.origin.y -= 10;

      velocity.x -= velocity.x * 0.0001 * clock.elapsedTime;
      velocity.z -= velocity.z * 0.0001 * clock.elapsedTime;

      direction.z = Number(mouvments.forward) - Number(mouvments.backward);
      direction.x = Number(mouvments.right) - Number(mouvments.left);
      direction.normalize(); // this ensures consistent movements in all directions

      if (mouvments.forward || mouvments.backward)
        velocity.z -= direction.z * 0.004 * clock.elapsedTime;
      if (mouvments.left || mouvments.right)
        velocity.x -= direction.x * 0.004 * clock.elapsedTime;

      if (mouvments.forward)
        controls.current.moveForward(
          speedThreshold(
            velocity.z * clock.elapsedTime,
            MIN_WLK_SPD,
            MAX_WLK_SPD
          )
        );
      if (mouvments.backward)
        controls.current.moveForward(
          -speedThreshold(
            -velocity.z * clock.elapsedTime,
            MIN_WLK_SPD,
            MAX_WLK_SPD
          )
        );

      if (mouvments.right)
        controls.current.moveRight(
          speedThreshold(
            velocity.x * clock.elapsedTime,
            MIN_WLK_SPD,
            MAX_WLK_SPD
          )
        );
      if (mouvments.left)
        controls.current.moveRight(
          -speedThreshold(
            -velocity.x * clock.elapsedTime,
            MIN_WLK_SPD,
            MAX_WLK_SPD
          )
        );
    }
  });
};

/**
 * CHARACTER INPUT CONTROLLER
 */
export const useCharacterInput = () => {
  const [keyforward, setForward] = useState(false);
  const [keybackward, setBackward] = useState(false);
  const [keyRight, setRight] = useState(false);
  const [keyLeft, setLeft] = useState(false);
  const [keyRun, setRun] = useState(false);

  const mouvment = {
    forward: keyforward,
    backward: keybackward,
    right: keyRight,
    left: keyLeft,
    run: keyRun,
  };

  useEffect(() => {
    // Keyboard event listeners
    document.addEventListener(
      "keydown",
      (e) => {
        switch (e.key) {
          case "z":
          case "w":
            setForward(true);
            break;
          case "s":
            setBackward(true);
            break;
          case "q":
          case "a":
            setLeft(true);
            break;
          case "d":
            setRight(true);
            break;
        }
      },
      { passive: true }
    );

    document.addEventListener(
      "keyup",
      (e) => {
        switch (e.key) {
          case "z":
          case "w":
            setForward(false);
            break;
          case "s":
            setBackward(false);
            break;
          case "q":
          case "a":
            setLeft(false);
            break;
          case "d":
            setRight(false);
            break;
        }
      },
      { passive: true }
    );
  }, [
    mouvment.backward,
    mouvment.forward,
    mouvment.left,
    mouvment.right,
    mouvment.run,
  ]);

  return mouvment;
};
