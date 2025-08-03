"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(SplitText);
const MenuScreenOverlay = () => {
  let tl = useRef<gsap.core.Timeline | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleState = () => {
    setIsOpen((currentState) => !currentState);
  };
  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(".hamburger-menu", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 0.5,
      ease: "power2.inOut",
    });
  
    const sectionLink = document.querySelector(".section-link");
    let splitText=SplitText.create(sectionLink,{
      type:"lines",
      mask:"lines"
    });
    tl.current.from(splitText.lines,{
      y:100,
      autoAlpha:0,
      stagger:-0.05
    },"<0.2");

  }, []);

  useEffect(() => {
    if (isOpen) {
      tl.current?.play();
            document.body.style.overflow = "hidden";

    } else {
      tl.current?.reverse();
            document.body.style.overflow = "auto";

    }
    // Cleanup (component unmount olursa scroll'u aç)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className=" ">
      {/* Overlay menu */}
      <nav className="fixed h-20 items-center top-0 left-0 right-0 max-w-[90rem] mx-auto w-full z-40 flex justify-between border ">
        <div className="menu_bar flex justify-between w-full ">
          <div className="logo relative">
            <div className=" inline-block   font-medium  text-black ">
              Logo
            </div>
          </div>
          <div
            onClick={handleState}
            className={`cursor-pointer ${isOpen ? "text-white" : "text-black"}`}
          >
            {isOpen?"close":"open"}
          </div>
        </div>
      </nav>
      {/* Normal flow state screen */}
      <div className="w-full fixed top-0 left-0 z-20 hamburger-menu h-screen bg-red-500 clipPath">
        <div className="flex pt-40 px-10 flex-col justify-between h-full pb-10 ">
          <div className="flex   max-sm:flex-col max-sm:gap-8">
            <div className=" border flex-1 section-link ">
              <h3 className="lg:text-9xl hover:underline  sm:text-6xl text-4xl cursor-pointer ">
                About
              </h3>
              <h3 className="lg:text-9xl hover:underline sm:text-6xl text-4xl cursor-pointer ">
                Contact
              </h3>
              <h3 className="lg:text-9xl hover:underline sm:text-6xl text-4xl cursor-pointer ">
                Footer
              </h3>
            </div>
            <div className=" border flex-1 flex flex-col gap-1">
              <h3 className="text-xl underline cursor-pointer social-link">
                Social Media
              </h3>
              <h3 className="text-4xl hover:underline cursor-pointer social-link">
                Instagram
              </h3>
              <h3 className="text-4xl hover:underline cursor-pointer social-link">
                Twitter
              </h3>
              <h3 className="text-4xl hover:underline cursor-pointer social-link">
                LinkedIn
              </h3>
            </div>
          </div>
          {/* Footer */}
          <div className="flex gap-4">
            <p className="text-base">Turkey,+90</p>
            <p className="text-base">Contact@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuScreenOverlay;
