"use client";

import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const blocksRef = useRef<HTMLDivElement[]>([]);
  const isTransitioning=useRef(false);

  useEffect(() => {
    // Create block elements
    const createBlocks = () => {
      if (!overlayRef.current) return;
      overlayRef.current.innerHTML = "";
      blocksRef.current = [];
      for (let i = 0; i < 20; i++) {
        const block = document.createElement("div");
        block.className = "block";
        overlayRef.current.appendChild(block);
        blocksRef.current.push(block);
      }
    };

    createBlocks();
    // Set gsap states
    gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

    // Reveal page function

    revealPage();

    //? Handle route change
    const handleRouteChange = (url: string) => {
      if (isTransitioning.current) return;
      isTransitioning.current=true;
      coverPage(url);
    };

    //* Gathering all links element before jump routing page
    const links = document.querySelectorAll('a[href^="/"]');
    const handleClick = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.href;
      const url = new URL(href).pathname;
      if (url !== pathName) handleRouteChange(url);
    };

    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    // Cleaning listener
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [router,pathName]);

  //   Cover animation
  const coverPage = (url: string) => {
    const tl = gsap.timeline({
      onComplete: () => router.push(url),
    });
    // Blocks animation
    tl.to(blocksRef.current,{
        scaleX:1,
        duration:0.4,
        stagger:0.03,
        ease:"power3.inOut",
        transformOrigin:"left"
    });
  };

  const revealPage=()=>{
    gsap.set(blocksRef.current,{scaleX:1,transformOrigin:"right"});
    gsap.to(blocksRef.current,{
        scaleX:0,
        duration:0.4,
        stagger:0.03,
        ease:"power3.inOut",
        transformOrigin:"right",
        onComplete:()=>{
            isTransitioning.current=false;
        }
    })
  }
  return (
    <>
      <div
        ref={overlayRef}
        className="fixed flex top-0 left-0 w-screen h-screen pointer-events-none"
      >
        {/* <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div>
      <div className="block"></div> */}
      </div>
      {children}
    </>
  );
};

export default PageTransition;
