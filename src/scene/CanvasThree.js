import { Suspense, useRef, useState, useEffect } from "react";
import Camera from "./components/Camera";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import VideoScreen from "./components/VideoScreen";
import ImageScreen from "./components/ImageScreen";
import Drone from "./components/Drone";
import CylinderBase from "./components/CylinderBase";
import Walls from "./components/Walls";
import { Stats } from "@react-three/drei";

const CanvasThree = () => {
  const videoTexture = useRef();
  const videoSource = useRef();
  const aLight = useRef();
  const dLight = useRef();
  const area = useRef();

  const imgs = {
    imgOne: "/01_logo.png",
    imgTwo: "/02_logo.png",
  };

  const [video, setVideo] = useState();
  const getVideo = (v) => {
    setVideo(v);
  };

  const playVideo = () => {
    const playVideo = videoTexture.current.play();
    if (playVideo !== undefined) {
      playVideo
        .then((_) => {})
        .catch((err) => {
          // console.log("Audio dialogue", err);
          return;
        });
    }
  };

  useEffect(() => {
    getVideo(videoTexture.current);
    playVideo();
  });
  return (
    <>
      <div className="canvas">
        <video
          ref={videoTexture}
          crossOrigin="anonymous"
          id={"video"}
          preload="none"
          muted={true}
          autoPlay={true}
          loop={true}
        >
          <source
            ref={videoSource}
            src="https://dl.dropboxusercontent.com/s/yberbg0f6dtxr5c/idle.mp4?dl=0"
          />
        </video>
        <Stats />
        <Canvas performance={{ max: 0.5 }} dpr={[1, 2]}>
          <ambientLight ref={aLight} intensity={1.2} color={"red"} />
          <directionalLight
            ref={dLight}
            position={[0, 0.5, 0]}
            intensity={0.5}
            color={"red"}
          />
          <Camera position={[0, 2, 20]} rotation={[0, 0, 0]} />
          <Suspense fallback={null}>
            <group ref={area}>
              <VideoScreen
                video={video}
                position={[0, 2, -2]}
                rotation={[0, 0, 0]}
              />
              <ImageScreen
                img={imgs.imgOne}
                position={[-4, 2, 0]}
                rotation={[0, Math.PI * 0.3, 0]}
                blending={true}
              />
              <ImageScreen
                img={imgs.imgOne}
                position={[4, 2, 0]}
                rotation={[0, -Math.PI * 0.3, 0]}
                blending={true}
              />
              <ImageScreen
                img={imgs.imgTwo}
                position={[-6.5, 2, 3]}
                rotation={[0, Math.PI * 0.3, 0]}
                blending={false}
              />
              <ImageScreen
                img={imgs.imgTwo}
                position={[6.5, 2, 4]}
                rotation={[0, -Math.PI * 0.3, 0]}
                blending={false}
              />
              <Float position={[0, 1.5, 0]} floatIntensity={0.1} speed={2}>
                <Drone position={[0, 1, 5]} rotation={[0, Math.PI, 0]} />
              </Float>
              <CylinderBase position={[0, 0, 5]} />
              <Walls />
            </group>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default CanvasThree;
