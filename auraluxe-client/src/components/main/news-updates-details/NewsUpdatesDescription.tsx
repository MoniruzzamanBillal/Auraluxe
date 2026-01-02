import Image from "next/image";

export default function NewsUpdatesDescription() {
  return (
    <div className="container mb-20 flex w-full max-w-[1400px] flex-col gap-10 p-0">
      {/* ===== title ===== */}
      <div className="flex w-full flex-col items-center gap-4 text-center xl:gap-7">
        <p className="text-charcoolGray sc-500:text-3xl sc-500:leading-9 text-center text-2xl leading-8 font-bold sm:text-4xl sm:leading-10 md:text-5xl md:leading-12 xl:text-6xl xl:leading-[72px]">
          Choosing The Perfect Bathroom Sink
        </p>
        {/* ========= */}
        <div className="flex w-[80%] flex-col items-center lg:w-[50%] xl:w-[40%]">
          <p className="text-darkGray pb-3 text-xs leading-4 font-medium md:text-sm md:leading-6 xl:text-[1rem] xl:leading-8">
            Choosing the perfect bathroom sink involves balancing aesthetics,
            functionality, and space considerations.
          </p>
          <p className="bg-brandMain h-1 w-20 " />
        </div>
      </div>

      {/* ======= main image && postman details ======= */}
      <div className="container flex w-full max-w-7xl flex-col gap-10 p-0 lg:mt-5">
        {/* ====== image ======= */}
        <div className="relative z-10 h-[25vh] max-h-[594px] sm:h-[35vh] md:h-[40vh] lg:h-[50vh] xl:h-screen">
          <Image
            alt="banner"
            src={"/news_updates/second_bg-banner.png"}
            height={594}
            width={1280}
            className="h-full w-full shrink-0 border-4 border-transparent border-b-white object-cover object-center"
          />
          <div className="absolute right-1/2 -bottom-3 -z-10 h-[52px] w-[52px] translate-x-1/2 rotate-45 rounded-lg bg-black" />
        </div>

        {/* ======= user details ======== */}
        <div className="flex flex-col items-center gap-2 lg:gap-5">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full md:h-[68px] md:w-[68px] lg:h-[88px] lg:w-[88px]">
            <Image
              alt="banner"
              src={"/users_img/user2.jpg"}
              height={100}
              width={100}
              className="h-full w-full shrink-0 object-cover object-center"
            />
          </div>
          {/* ======== */}
          <div className="space-y-0.5 text-center lg:space-y-1.5">
            <p className="text-charcoolGray text-xs leading-3 font-bold lg:text-sm lg:leading-5">
              Posted by <span className="underline">Alamin Chowdhury</span>
            </p>
            <p className="text-brandMain text-xs leading-6 font-medium lg:text-[1rem] lg:leading-8">
              September 23, 2023
            </p>
          </div>
        </div>
      </div>

      {/* =========== contents ========== */}
      <div className="container  max-w-5xl space-y-10 p-0">
        {/* ========= title ====== */}
        <div className="space-y-5 xl:space-y-10">
          <p className="text-charcoolGray text-xl font-bold sm:text-3xl lg:text-4xl lg:leading-12 xl:text-5xl xl:leading-[70px]">
            Choosing the Perfect Bathroom Sink: A Comprehensive Guide
          </p>
          <p className="text-xs leading-4 sm:text-sm sm:leading-6 lg:text-[1rem] lg:leading-8">
            In smaller bathrooms, space-saving options like wall-mounted or
            pedestal sinks can create an open feel by freeing up floor space and
            maintaining a minimalist look. Corner sinks are also an excellent
            choice for compact spaces, maximizing functionality without
            overcrowding the area.For larger bathrooms, vanity sinks offer
            additional countertop and storage space, making them ideal for
            households that require extra room for toiletries and essentials.
            Double-sink vanities are a great option for shared bathrooms,
            providing convenience and efficiency for multiple users.
            Additionally,{" "}
          </p>
        </div>
        {/* ===== */}
        <div className="border-l-brandMain border-l-4 pl-3 lg:pl-6">
          <p className="py-3 text-xs leading-4 sm:text-sm sm:leading-6 lg:py-0 lg:text-[1rem] lg:leading-8">
            For larger bathrooms, vanity sinks offer additional countertop and
            storage space. Begin by measuring your bathroom to determine the
            available space for the sink. Consider both the width and depth of
            the area where you plan to install it, ensuring enough clearance for
            comfortable use. In smaller bathrooms, space-saving options like
            wall-mounted or pedestal sinks can create an open feel by freeing up
            floor space and maintaining a minimalist look.
          </p>
        </div>
        {/* ==== img === */}
        <div className="max-h-[403px] lg:h-screen">
          <Image
            alt="tilottoma Logo"
            src={"/purchase_guide/article1/second_img.png"}
            height={403}
            width={1024}
            className="h-full w-full shrink-0 object-cover"
          />
        </div>
        {/* ===== section 1 ====== */}
        <div className="space-y-10 lg:space-y-16">
          {/* ===== texts ===== */}
          <div className="space-y-4 lg:space-y-5">
            <p className="text-lg leading-7 font-bold text-black">
              Precise Color and Design Selection:
            </p>
            <p className="text-xs leading-4 sm:text-sm sm:leading-6 lg:text-[1rem] lg:leading-8">
              For larger bathrooms, vanity sinks offer additional countertop and
              storage space, making them ideal for households that require extra
              room for toiletries and essentials. Double-sink vanities are
              particularly beneficial for shared bathrooms, allowing multiple
              users to access the sink simultaneously. With a wide range of
              designs, including freestanding, built-in, and custom vanities,
              homeowners can select a style that complements the overall
              bathroom décor. Furthermore, incorporating storage solutions
            </p>
          </div>
          {/* ==== image ===== */}
          <div className="sc-500:h-[30vh] h-[20vh] max-h-[559px] lg:h-screen">
            <Image
              alt="tilottoma Logo"
              src={"/purchase_guide/article1/third_img.png"}
              height={559}
              width={1024}
              // unoptimized
              className="h-full w-full shrink-0 object-cover"
            />
          </div>
        </div>

        {/* ===== section 2 ====== */}
        <div className="space-y-10 lg:space-y-16">
          {/* ===== texts ===== */}
          <div className="space-y-4 lg:space-y-5">
            <p className="text-lg leading-7 font-bold text-black">
              Think About The Available Space:
            </p>
            <p className="text-xs leading-4 sm:text-sm sm:leading-6 lg:text-[1rem] lg:leading-8">
              Another factor to consider is the placement of the sink in
              relation to plumbing connections. If you are remodeling an
              existing bathroom, choosing a sink that aligns with the current
              plumbing setup can save costs and installation time. However, if
              you are designing a new bathroom or undergoing major renovations,
              you may have more flexibility in selecting the perfect sink style
              and placement. Lastly, think about ergonomics and user preferences
            </p>
          </div>
          {/* ==== image ===== */}
          <div className="sc-500:h-[30vh] h-[20vh] max-h-[559px] lg:h-screen">
            <Image
              alt="tilottoma Logo"
              src={"/purchase_guide/article1/forth_img.png"}
              height={559}
              width={1024}
              className="h-full w-full shrink-0 object-cover"
            />
          </div>
        </div>

        {/* ===== section 3 ====== */}
        <div className="space-y-10 lg:space-y-16">
          {/* ===== texts ===== */}
          <div className="space-y-4 lg:space-y-5">
            <p className="text-lg leading-7 font-bold text-black">
              Think About The Available Space:
            </p>
            <p className="text-xs leading-4 sm:text-sm sm:leading-6 lg:text-[1rem] lg:leading-8">
              Another factor to consider is the placement of the sink in
              relation to plumbing connections. If you are remodeling an
              existing bathroom, choosing a sink that aligns with the current
              plumbing setup can save costs and installation time. However, if
              you are designing a new bathroom or undergoing major renovations,
              you may have more flexibility in selecting the perfect sink style
              and placement. Lastly, think about ergonomics and user preferences
            </p>
          </div>
          {/* ==== image ===== */}
          <div className="sc-500:h-[30vh] h-[20vh] max-h-[559px] lg:h-screen">
            <Image
              alt="tilottoma Logo"
              src={"/purchase_guide/article1/fifth_img.png"}
              height={559}
              width={1024}
              className="h-full w-full shrink-0 object-cover"
            />
          </div>
        </div>

        {/* =========== */}
        <div className="space-y-4 lg:space-y-5">
          <p className="text-lg leading-7 font-bold text-black">
            Think About The Available Space:
          </p>
          <p className="text-xs leading-4 sm:text-sm sm:leading-6 lg:text-[1rem] lg:leading-8">
            Another factor to consider is the placement of the sink in relation
            to plumbing connections. If you are remodeling an existing bathroom,
            choosing a sink that aligns with the current plumbing setup can save
            costs and installation time. However, if you are designing a new
            bathroom or undergoing major renovations, you may have more
            flexibility in selecting the perfect sink style and placement.
            Lastly, think about ergonomics and user preferences
          </p>
        </div>
      </div>
    </div>
  );
}
