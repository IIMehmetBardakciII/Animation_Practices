"use client";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useEffect } from "react";
gsap.registerPlugin(SplitText, ScrollTrigger);
const RevealImageAnimation1 = () => {
  useEffect(() => {
    const bannerIntroTextElements =
      gsap.utils.toArray<HTMLElement>(".banner-intro-text");
    const bannerMaskLayers = gsap.utils.toArray<HTMLElement>(".mask");
    const bannerContainer = document.querySelector(
      ".banner-img-container"
    ) as HTMLElement;
    const bannerHeader = document.querySelector(
      ".banner-header h1"
    ) as HTMLElement;

    if (!bannerContainer || !bannerHeader) return;

    const splitText = new SplitText(bannerHeader, { type: "words" });
    const words = splitText.words;
    gsap.set(words, { opacity: 0 });

    bannerMaskLayers.forEach((layer, i) => {
      gsap.set(layer, { scale: 0.9 - i * 0.15 });
    });
    gsap.set(bannerContainer, { scale: 0 });

    ScrollTrigger.create({
      trigger: ".banner",
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      scrub: true,
      pin: true,
      pinSpacing: true,

      onUpdate: (self) => {
        const progress = self.progress;
        gsap.set(bannerContainer, { scale: progress });

        bannerMaskLayers.forEach((layer, i) => {
          // lERP FORMULE - Linear interpolation
          // lerp(start,end,t)=start+(end−start)⋅t
          // start → başlangıç değeri
          // end → bitiş değeri
          // t → 0 ile 1 arasında bir sayı (0 = start, 1 = end, 0.5 = ortası)
          const initialScale = 0.9 - i * 0.15;
          const layerProgress = Math.min(progress / 0.9, 1.0);
          const currentScale =
            initialScale + layerProgress * (1.0 - initialScale);
          gsap.set(layer, { scale: currentScale });
        });

        if (progress <= 0.9) {
          const textProgress = progress / 0.9;
          const moveDistance = window.innerWidth * 0.5;

          gsap.set(bannerIntroTextElements[0], {
            x: -textProgress * moveDistance,
          });
          gsap.set(bannerIntroTextElements[1], {
            x: textProgress * moveDistance,
          });
        }

        if (progress >= 0.7 && progress <= 0.9) {
          const headerProgress = (progress - 0.7) / 0.2;
          const totalWords = words.length;

          words.forEach((word, i) => {
            const wordStartDelay = i / totalWords;
            const wordEndDelay = (i + 1) / totalWords;

            let wordOpacity = 0;

            if (headerProgress >= wordEndDelay) {
              wordOpacity = 1;
            } else if (headerProgress >= wordStartDelay) {
              const wordProgress =
                (headerProgress - wordStartDelay) /
                (wordEndDelay - wordStartDelay);
              wordOpacity = wordProgress;
            }
            gsap.set(word, { opacity: wordOpacity });
          });
        } else if (progress < 0.7) {
          gsap.set(words, { opacity: 0 });
        } else if (progress > 0.9) {
          gsap.set(words, { opacity: 1 });
        }
      },
    });
  }, []);
  return (
    <div className="banner">
      <div className="banner-img-container">
        {/* Html emmet (.) => classname , (>) => child , ([])=> attribute like src and alt , ({}) => içeriğe yazı ekleme */}
        <div className="img">
          <img src="/image.jpg" alt="image" />
        </div>
        <div className="img mask">
          <img src="/imageWithoutBg.png" alt="image" />
        </div>
        <div className="img mask">
          <img src="/imageWithoutBg.png" alt="image" />
        </div>
        <div className="img mask">
          <img src="/imageWithoutBg.png" alt="image" />
        </div>
        <div className="img mask">
          <img src="/imageWithoutBg.png" alt="image" />
        </div>
        <div className="img mask">
          <img src="/imageWithoutBg.png" alt="image" />
        </div>
        <div className="img mask">
          <img src="/imageWithoutBg.png" alt="image" />
        </div>
        <div className="banner-header">
          <h1>The season wears confidince</h1>
        </div>
      </div>

      <div className="banner-intro-text-container">
        <div className="banner-intro-text">
          <h1>Surface</h1>
        </div>
        <div className="banner-intro-text">
          <h1>Layered</h1>
        </div>
      </div>
    </div>
  );
};

export default RevealImageAnimation1;
