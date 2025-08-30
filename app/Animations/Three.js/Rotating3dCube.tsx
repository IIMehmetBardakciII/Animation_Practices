"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Color, Mesh } from "three";

const Rotating3dCube = () => {
  const cubeRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const color=useRef(new Color("orange"));
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x -= 0.01;
      cubeRef.current.rotation.y += 0.01;

      const targetColor=new Color(hovered?"hotpink":"orange");
    //   smooth transition
    color.current.lerp(targetColor,0.01);
    // effect the mash
    (cubeRef.current.material as any).color=color.current;
    }
  });
  return (
    <mesh
      ref={cubeRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color.current} />
    </mesh>
  );
};

export default Rotating3dCube;
