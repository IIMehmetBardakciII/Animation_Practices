import Image from "next/image";

const HoverIconAnimation = () => {
  return (
    <div className="flex items-center justify-center w-fit ml-20  gap-2 group cursor-pointer">
      <div className="hoverAnimationWithIcon group-hover:bg-red-400">
        <span className="inline-block">Text</span>
        <span>Text</span>
        <span>Text</span>
        <span>Text</span>
        <span>Text</span>
      </div>
      <div
       className="hoverAnimationWithIconImage  ">
        <Image
          src={"/file.svg"}
          alt="file"
          width={16}
          height={16}
          // className="group-hover:-translate-y-full group-hover:transition-all group-hover:blur-[0.5px] ease-in-out"
        />
        <Image
          src={"/file.svg"}
          alt="file"
          width={16}
          height={16}
          // className="absolute top-0 left-0 z-[1] translate-y-full group-hover:translate-y-0 transition-all ease-in-out"
        />
        <Image
          src={"/file.svg"}
          alt="file"
          width={16}
          height={16}
          // className="absolute top-0 left-0 z-[1] delay-[10ms] translate-y-full group-hover:blur-none group-hover:translate-y-0 transition-all ease-in-out"
        />
        <Image
          src={"/file.svg"}
          alt="file"
          width={16}
          height={16}
          // className="absolute top-0 left-0 z-[1] delay-[20ms] translate-y-full group-hover:translate-y-0 transition-all ease-in-out"
        />
        <Image
          src={"/file.svg"}
          alt="file"
          width={16}
          height={16}
          // className="absolute top-0 left-0 z-[1] delay-[40ms] translate-y-full group-hover:translate-y-0 transition-all ease-in-out"
        />
      </div>
    </div>
  );
};

export default HoverIconAnimation;
