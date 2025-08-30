'use client'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function createTextureForText(
  text: string,
  font: string,
     width: number,
  height: number,
  color = "1a1a1a",
  fontWeight = "600",
 
) {
  const canvas = document.createElement("canvas");
  canvas.width = width * 1;
  canvas.height = height * 1;
  const ctx = canvas.getContext("2d", { alpha: true })!;

  const fontsize = Math.min(canvas.width, canvas.height) * 0.5;
  ctx.font = `${fontWeight} ${fontsize}px ${font}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;

  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.format = THREE.RGBAFormat;
  return texture;
}
const DistoredMesh = () => {
  //* Animasyon için window değerleri ve meshin referansı lazım.
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, size } = useThree();

  //* Mouse başlnagıç değerleri
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const targetMouse = useRef({ x: 0.5, y: 0.5 });
  const prevMouse = useRef({ x: 0.5, y: 0.5 });
  const easeFactor = useRef(0.02);
  //* YUKARDA oluşturduğumuz texture fonksiyonunu çağırma.
  const root = document.documentElement;
  const font = getComputedStyle(root)
    .getPropertyValue("--font-roboto")
    .replace(/"/g, "")
    .trim();
  const texture = useMemo(
    () => createTextureForText("DISTORTION", font,viewport.width,viewport.height,"#0e3017"),
    [font]
  );

  //* Uniformslar shadera dışarıdan verilebilen animasyon için gerekli özellikler
  const uniforms = useRef({
    //*u_texture , oluşturduğumuz texture için gerekli
    u_texture: { value: texture },
    u_mouse: { value: new THREE.Vector2(mouse.current.x, mouse.current.y) },
    u_prevMouse: {
      value: new THREE.Vector2(prevMouse.current.x, prevMouse.current.y),
    },
  });

  //* useFrame hooku three.jsin frame by frame animasyonu için gerekli

  useFrame(() => {
    mouse.current.x +=
      (targetMouse.current.x - mouse.current.x) * easeFactor.current;
    mouse.current.y +=
      (targetMouse.current.y - mouse.current.y) * easeFactor.current;

    prevMouse.current.x +=
      (mouse.current.x - prevMouse.current.x) * easeFactor.current;
    prevMouse.current.y +=
      (mouse.current.y - prevMouse.current.y) * easeFactor.current;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.u_mouse.value.set(mouse.current.x, mouse.current.y);
      mat.uniforms.u_prevMouse.value.set(
        prevMouse.current.x,
        prevMouse.current.y
      );
    }
  });

  //* Vertex shader -> piksellerin konum bilgileri için gerekli, fragmentShader animasyon ve diğer her şey için gerekli shader bu ikisinden oluşur.

  const vertexShader = `
    varying vec2 vUv;
    void main(){
        vUv=uv;
        gl_Position=projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
`;
  const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_texture;
    uniform vec2 u_mouse;
    uniform vec2 u_prevMouse;
    
    void main(){
      vec2 gridUV = floor(vUv * vec2(40.0,40.0)) / vec2(40.0,40.0);
      vec2 centerOfPixel = gridUV + vec2(1.0/40.0,1.0/40.0);

      vec2 mouseDirection = u_mouse - u_prevMouse;
      vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
      float pixelDistanceToMouse = length(pixelToMouseDirection);
      float strength = smoothstep(0.1, 0.0, pixelDistanceToMouse);

      //* uvOffset → etkiyi hesaplıyor (ne kadar ve hangi yönde kaydırma).
      //*uv → orijinal UV’den offset çıkarıp yeni dokunun okunacağı koordinat yapıyor.
      vec2 uvOffset = strength * -mouseDirection * 0.3;
      vec2 uv = vUv - uvOffset;
      gl_FragColor = texture2D(u_texture, uv);
    }
`;

  return (
    <mesh
      ref={meshRef}
    //   scale={[viewport.width, viewport.height, 1]}
      onPointerMove={(e) => {
        targetMouse.current = {
          x: e.clientX / size.width,
          y: 1 - e.clientY / size.height,
        };
        easeFactor.current = 0.04;
      }}
      onPointerEnter={() => {
        easeFactor.current = 0.02;
      }}
      onPointerLeave={() => {
        targetMouse.current = { ...prevMouse.current };
        easeFactor.current = 0.02;
      }}
    >
<planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
      fragmentShader={fragmentShader}
      vertexShader={vertexShader}
      uniforms={uniforms.current}
      />
    </mesh>
  );
};
const TextDistortionEffectdENEME = () => {
  return (
    <Canvas orthographic camera={{zoom:1,position:[0,0,1]}}>
      <DistoredMesh />
    </Canvas>
  );
};

export default TextDistortionEffectdENEME;
