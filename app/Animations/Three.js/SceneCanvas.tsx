'use client'
import { Canvas } from "@react-three/fiber"
import PlaneMesh from "./PlaneMesh";

const SceneCanvas = () => {
    
  return (
   <div className="w-screen h-screen">
     <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5}/>
      <directionalLight intensity={1} position={[5,5,5]} />
      {/* <Rotating3dCube/> */}
      <PlaneMesh/>
    </Canvas>
   </div>
  )
}

export default SceneCanvas