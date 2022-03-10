import { extend } from "@react-three/fiber";
import glsl from "babel-plugin-glsl/macro";
import { shaderMaterial } from "@react-three/drei";

const OverlayShaderMaterial = shaderMaterial(
  //Uniforms
  {},
  //Vertex Shader
  glsl` 
  precision mediump float;
  varying vec2 vUv;
  
  void main(){
    gl_Position =  vec4(position, 1.0);

    vUv = uv;
  }
  
  `,
  //Fragment shader
  glsl`
  precision mediump float;
    varying vec2 vUv;

        void main(){
  
          gl_FragColor = vec4( 0.0, 0.0 ,0.0, 0.5);
        }
 
  `
);

extend({ OverlayShaderMaterial });

export default OverlayShaderMaterial;
