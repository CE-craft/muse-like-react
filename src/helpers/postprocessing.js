import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
//import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

export const useCustomComposer = () => {
  const stop = false;
  //useFrame(({ gl, scene, camera }) => stop && gl.render(scene, camera), 1);
  useFrame(({ gl, scene, camera }) => {
    const effectCompser = new EffectComposer(gl);
    effectCompser.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    effectCompser.setSize(window.innerWidth, window.innerHeight);

    const renderPass = new RenderPass(scene, camera);
    effectCompser.addPass(renderPass);

    const params = {
      exposure: 1,
      bloomStrength: 0.5,
      bloomThreshold: 0,
      bloomRadius: 2,
    };

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    effectCompser.addPass(bloomPass);

    // const glitchPass = new GlitchPass();
    // glitchPass.goWild = true;
    // effectCompser.addPass(glitchPass);

    effectCompser.render();
  });
};
