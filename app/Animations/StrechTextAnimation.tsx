"use client";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const StrechTextAnimation = () => {
  const textElement1 = useRef<HTMLHeadingElement>(null);
  const textElement2 = useRef<HTMLHeadingElement>(null);
  const textElement3 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // const targetScales: number[] = [];

    // function calculateDynamicScale() {
    //   for (let i = 1; i <= 3; i++) {
    //     const section = document.querySelector(
    //       `.sticky-text-${i}`
    //     ) as HTMLElement | null;
    //     const text = document.querySelector(
    //       `.sticky-text-${i} .text-container h1`
    //     ) as HTMLElement | null;

    //     if (!section || !text) return;
    //     const sectionHeight = section.offsetHeight;
    //     const textHeight = text.offsetHeight;
    //     targetScales[i - 1] = (sectionHeight / textHeight);
    //   }
    // }
    // calculateDynamicScale();
    let targetScales: number[] = [];
    function calculateDynamicScale() {
      targetScales = Array.from({ length: 3 }, (_, i) => {
        const section = document.querySelector(
          `.sticky-text-${i + 1}`
        ) as HTMLElement;
        const text = section?.querySelector(
          ".text-container h1"
        ) as HTMLElement;
        if (!section || !text) return 1; // default scale
        return section.offsetHeight / text.offsetHeight;
      });
      console.log(targetScales);
    }
    calculateDynamicScale();
    window.addEventListener("resize", calculateDynamicScale);

    // function setScaleY(element: HTMLElement, scale: number) {
    //   element.style.transform = `scaleY(${scale})`;
    // }
    // gsap.set(textElement1.current,{scaleY:0});
    ScrollTrigger.create({
      trigger: ".sticky-text-1",
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        if (!textElement1.current) return;
        const currentScale = targetScales[0] * self.progress;
        // setScaleY(textElement1.current, currentScale);
        gsap.set(textElement1.current, { scaleY: currentScale });
      },
    });
    ScrollTrigger.create({
      trigger: ".sticky-text-1",
      start: "top top",
      end: `+=${window.innerHeight}px`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        if (!textElement1.current) return;
        const currentScale = targetScales[0] * (1 - self.progress);
        // setScaleY(textElement1.current, currentScale);
        gsap.set(textElement1.current, { scaleY: currentScale });
      },
    });
    ScrollTrigger.create({
      trigger: ".sticky-text-2",
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        if (!textElement2.current) return;
        const currentScale = targetScales[1] * self.progress;
        // setScaleY(textElement2.current, currentScale);
        gsap.set(textElement2.current, { scaleY: currentScale });
      },
    });

    ScrollTrigger.create({
      trigger: ".sticky-text-2",
      start: "top top",
      end: `+=${window.innerHeight}px`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
        if (!textElement2.current) return;
        const currentScale = targetScales[1] * (1 - self.progress);
        // setScaleY(textElement2.current, currentScale);
        gsap.set(textElement2.current, { scaleY: currentScale });
      },
    });

    ScrollTrigger.create({
      trigger: ".sticky-text-3",
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        if (!textElement3.current) return;
        const currentScale = targetScales[2] * self.progress;
        // setScaleY(textElement3.current, currentScale);
        gsap.set(textElement3.current, { scaleY: currentScale });
      },
    });

    return () => {
      window.removeEventListener("resize", calculateDynamicScale);
    };
  }, []);

  return (
    <div className="strechAnimationContainer">
      <section className="sticky-text-1">
        <div className="text-container">
          <h1 ref={textElement1}>Overdrive</h1>
        </div>
      </section>
      <section className="sticky-text-2">
        <div className="text-container">
          <h1 ref={textElement2}>Static</h1>
        </div>
      </section>
      <section className="sticky-text-3">
        <div className="text-container">
          <h1 ref={textElement3}>Friction</h1>
        </div>
      </section>
    </div>
  );
};

export default StrechTextAnimation;
