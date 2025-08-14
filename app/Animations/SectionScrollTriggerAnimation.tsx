"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
const SectionScrollTriggerAnimation = () => {
  useGSAP(() => {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
      });
      gsap.set(section, {
        clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0 100%)",
      });
      tl.to(section, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      });
      tl.to(section, {
        clipPath: "polygon(0% 0%, 100% 0%, 80% 80%, 20% 80%)",
      });
    });

    gsap.fromTo(
      ".text1",
      {
        yPercent: 100,
        opacity: 0,
        clipPath: "inset(0 0 100% 0)",
      },
      {
        yPercent: 0,
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        ease: "power3.out",
        duration: 1,
        scrollTrigger: {
          trigger: ".text1",
          start: "top 80%",
          toggleActions: "play none none reverse",
          scrub:true,
                markers: true, // debug için ekledim

        },
      }
    );
  });
  return (
    <div>
      <div className="w-screen h-screen bg-red-500"></div>
      <div className="section w-screen h-screen mt-[200px] bg-green-500 flex items-center justify-center">
        <h1 className="text1 text-4xl text-gray-300">Deneme</h1>

      </div>

      <div className="section w-screen h-[1200px] mt-[200px] bg-gray-500"></div>
      <div className=" w-screen h-screen mt-[200px] bg-gray-500"></div>
    </div>
  );
};

export default SectionScrollTriggerAnimation;

// Clip path yüzdelik olarak noktalar 4 nokta 0-0, 100-0, 100%-100%, 0% 100% normali bu
