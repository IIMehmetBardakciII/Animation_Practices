"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const MeshPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree(); // artık Canvas içinde güvenli
  const [mouse,setMouse]=useState({x:0,y:0});
  const uniforms = useRef({
    u_resolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    // u_time: { value: 0 },
    u_mouse:{value:new THREE.Vector2(mouse.x,mouse.y)}
  });

  // useFrame(({ clock }) => {
  //   if (meshRef.current) {
  //     uniforms.current.u_time.value = clock.elapsedTime;
  //     uniforms.current.u_resolution.value.set(viewport.width, viewport.height);
  //   }
  // });

  useFrame(()=>{
    if(meshRef.current){
    uniforms.current.u_mouse.value.set(mouse.x, mouse.y);
    }
  })
  const fragmentShader = `
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    void main() {
    //* Normalize functions are actually map function which simplified.
    //* Pixel normalization variable st.
      vec2 st = gl_FragCoord.xy / u_resolution;
    //* mouse position normalization variable st.
      vec2 mouse= u_mouse;

      // bool insideX = st.x > 0.3 && st.x < 0.7;
      // bool insideY = st.y > 0.3 && st.y < 0.7;

      // if (insideX && insideY) {
      //   gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); // sarı
      // } else {
      //   gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // siyah
      // }

      // Distance between points.
      float dist=distance(st,mouse);

      if(dist<0.2){
        gl_FragColor=vec4(1.,1.,0.,1.);
      }else{
        gl_FragColor=vec4(1.,0.,0.,1.);
        }
    }
  `;

  return (
    <mesh 
  onPointerMove={(e: any) => {
  setMouse({
    x: (e.point.x + viewport.width / 2) / viewport.width,
    y: (e.point.y + viewport.height / 2) / viewport.height
  });
}}


    ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial fragmentShader={fragmentShader} uniforms={uniforms.current} />
    </mesh>
  );
};

const Learning = () => {
  return (
    <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
      <MeshPlane />
    </Canvas>
  );
};

export default Learning;
