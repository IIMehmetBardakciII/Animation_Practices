import HoverAnimation from "./Animations/HoverAnimation";
import HoverAnimation2 from "./Animations/HoverAnimation2";
import MenuScreenOverlay from "./Animations/MenuScreenOverlay";
import PageTransition from "./Animations/PageTransition";
import RevealImageAnimation1 from "./Animations/RevelImageAnimation1";
import SectionScrollTriggerAnimation from "./Animations/SectionScrollTriggerAnimation";
import StrechTextAnimation from "./Animations/StrechTextAnimation";

const Home = () => {
  return (
    <div className="w-full h-full overflow-clip">
      {/* <MenuScreenOverlay /> */}
      {/* <HoverAnimation />
      <HoverAnimation2 /> */}
      {/* <SectionScrollTriggerAnimation /> */}
      {/* <RevealImageAnimation1/> */}
      <div className="w-screen h-screen"></div>
      <StrechTextAnimation/>
    </div>
  );
};

export default Home;
