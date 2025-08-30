import HoverAnimation from "./Animations/HoverAnimation";
import HoverAnimation2 from "./Animations/HoverAnimation2";
import MenuScreenOverlay from "./Animations/MenuScreenOverlay";
import PageTransition from "./Animations/PageTransition";
import RevealImageAnimation1 from "./Animations/RevelImageAnimation1";
import SceneCanvas from "./Animations/Three.js/SceneCanvas";
import SectionScrollTriggerAnimation from "./Animations/SectionScrollTriggerAnimation";
import StrechTextAnimation from "./Animations/StrechTextAnimation";
import Learning from "./Animations/Three.js/Learning";
import TextDistortionEffect from "./Animations/TextDistortionEffect";

const Home = () => {
  return (
    <div className="w-full h-[500px]  ">
      {/* <MenuScreenOverlay /> */}
      {/* <HoverAnimation /> */}
      {/* <HoverAnimation2 /> */}
      {/* <SectionScrollTriggerAnimation /> */}
      {/* <RevealImageAnimation1/> */}
      {/* <StrechTextAnimation/> */}
      {/* <SceneCanvas/> */}
   

      <TextDistortionEffect/>
   
      </div>
  );
};

export default Home;
