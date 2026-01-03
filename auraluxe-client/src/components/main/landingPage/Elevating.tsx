export default function Elevating() {
  return (
    <div className="group sc-500:h-[30vh] relative flex h-[180px] max-h-[872px] w-full items-center justify-center bg-[url(/landingPage/elevating/elevating.jpg)] bg-cover bg-center bg-no-repeat md:h-[50vh] lg:h-[60vh] xl:h-screen">
      {/*===== overlay ======= */}
      <div className="absolute z-10 h-full w-full bg-black/66" />
      {/* ===== contents ====== */}
      <div className="sc-500:w-[80%] relative z-100 flex w-[80%] max-w-[931px] flex-col items-center gap-1 text-white md:gap-2.5 lg:w-[100%] lg:gap-5 xl:gap-9">
        {/*  */}
        <div className="relative flex w-full justify-center overflow-hidden lg:min-h-[140px]">
          <div className="sc-laptop:absolute sc-laptop:-bottom-40 sc-laptop:group-hover:bottom-0 sc-500:text-lg text-center text-sm leading-6 font-bold transition-all duration-200 ease-in-out md:text-4xl md:leading-12 xl:text-6xl xl:leading-[4.5rem]">
            <p className="">
              Elevating Relaxation and <br /> Rejuvenation
            </p>
          </div>
        </div>
        {/*  */}
        <div className="bg-brandMain sc-laptop:opacity-0 sc-laptop:group-hover:opacity-100 h-[1px] w-full max-w-[25px] transition-all duration-300 ease-in-out md:max-w-[72px] lg:h-[3px]"></div>
        {/*  */}
        <div className="relative flex w-full justify-center overflow-hidden lg:min-h-[120px]">
          <div className="sc-laptop:absolute sc-laptop:-top-40 sc-laptop:group-hover:top-0 sc-500:text-sm sc-500:leading-6 text-center text-xs leading-4.5 transition-all duration-200 ease-in-out md:text-lg md:leading-6.5 xl:text-xl xl:leading-8.5">
            <p>
              Boasting a style that exudes a completely unique and almost
              fascinating atmosphere, it captivates the senses with an
              irresistible charm, blending sophistication with an air of
              mystery. Every element is meticulously
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
