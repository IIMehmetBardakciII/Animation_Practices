"use client";

import { useRef } from "react";
import { Mesh, ShaderMaterial } from "three";
import { fragment, vertex } from "./DistShaderMaterial";
import { useFrame } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";

const PlaneMesh = () => {
  const meshRef = useRef<Mesh>(null);
  const texture=useTexture("/image.jpg")
  const {width,height}=texture.image;
  const scale=useAspect(
    width,
    height,
    0.3
  )
  // const { amplitude, waveLength } = {
  //   amplitude: { value: 0.25, min: 0, max:2, step: 0.05 },
  //   waveLength: { value: 5, min: 0, max: 20, step: 1 },
  // };
const amplitude=0.25;
const waveLength=5.;
  const uniforms = useRef({
    uTexture:{value:texture},
    uTime:{value:0},
    uAmplitude: { value: amplitude },
    uWaveLength: { value: waveLength },
  });
  useFrame(()=>{
    (meshRef.current?.material as ShaderMaterial).uniforms.uTime.value+=0.04;
    (meshRef.current?.material as ShaderMaterial).uniforms.uWaveLength.value=waveLength;
    (meshRef.current?.material as ShaderMaterial).uniforms.uAmplitude.value=amplitude;
  })
  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[1, 1, 50, 50]} />{" "}
      {/* width,height -- vertex number x,y -- 15x15=vertexTotalNumber */}
      {/* <redMaterial/> */}
      <shaderMaterial
        // wireframe
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
      />
    </mesh>
  );
};

export default PlaneMesh;
