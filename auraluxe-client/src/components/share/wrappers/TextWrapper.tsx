import React from "react";

type Props = {
  children: React.ReactNode;
  text?: string;
};

export default function TextWrapper({ children, text }: Props) {
  return (
    <div className="relative">
      {/*======= background text ========= */}
      <div className="pointer-events-none absolute -left-4 -z-10 flex items-start justify-start sm:-top-3.5 sm:-left-8 md:-top-7 lg:-top-10 xl:-top-14 xl:-left-10">
        <span className="bg-[linear-gradient(90.13deg,_#BEBEBE_-3.39%,_rgba(84,84,84,0.1)_76%)] bg-clip-text text-[4rem] leading-none font-bold tracking-wider text-transparent opacity-20 select-none sm:text-[7rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[11.25rem]">
          <p>{text}</p>
        </span>
      </div>
      {children}
    </div>
  );
}
