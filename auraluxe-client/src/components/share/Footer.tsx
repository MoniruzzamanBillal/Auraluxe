/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

export default function Footer() {
  const footerList = [
    {
      title: "Resources",
      children: [
        {
          name: "About Us",
          link: "/our-stories",
        },
        {
          name: "Contact Us",
          link: "/contact",
        },
        {
          name: "Career",
          link: "/career",
        },
        {
          name: "Wishlist",
          link: "/wishlist",
        },

        {
          name: "News & Updates",
          link: "/news-updates",
        },
      ],
    },
    {
      title: "Products",
      children: [
        {
          name: "Bathware",
          link: `/product?category=692ae02771ae85675e20c067`,
        },
        {
          name: "Tiles and Surfaces",
          link: `/product?category=692abfd171ae85675e20b9db`,
        },
        {
          name: "Architectural Hardware",
          link: `/product?category=692abd3d71ae85675e20b8c2`,
        },
        {
          name: "Industrial Solutions",
          link: `/product?category=692abbc971ae85675e20b849`,
        },
      ],
    },
    {
      title: "Quick Links",
      children: [
        {
          name: "Tilottoma Hatirpool",
          link: "/contact",
        },
        {
          name: "Tilottoma Gulshan",
          link: "/contact",
        },
        {
          name: "Tilottoma Uttara",
          link: "/contact",
        },
        {
          name: "Tilottoma Chittagong",
          link: "/contact",
        },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-r from-black via-black to-[#2b0000] md:py-12 lg:max-h-[485px]">
      <div className="relative z-10 container mx-auto grid grid-cols-2 gap-8 px-4 pt-10  lg:grid-cols-4">
        {/* Resources */}
        {footerList.map((footer, index) => (
          <div key={index + 1}>
            <h4 className="text-mediumGray mb-4 text-xs leading-4 font-bold uppercase md:text-sm md:leading-5">
              {footer?.title}
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {footer?.children?.map((item, secIndex) => (
                <li
                  className="text-lightGray text-[0.625rem] leading-3 font-medium md:text-[1rem] md:leading-6 md:font-normal"
                  key={secIndex + 1}
                >
                  <Link
                    href={item?.link}
                    className="group relative inline-block"
                  >
                    <p className="bg-brandMain absolute -bottom-1 h-[2px] w-[0%] transition-all duration-500 ease-in-out group-hover:w-[70%]"></p>
                    <div>{item?.name}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/*========= Contact =======*/}
        <div>
          <h4 className="text-mediumGray mb-4 text-xs leading-4 font-bold md:text-sm md:leading-5">
            CONTACT
          </h4>
          <ul className="space-y-3">
            <li className="text-lightGray flex items-start gap-2 text-[0.625rem] leading-3 font-medium md:text-[1rem] md:leading-6 md:font-normal">
              <MdLocationOn className="mt-1 shrink-0 text-sm md:text-lg" />
              <span>
                67, Bir Uttam C.R Dutt Road, Hatirpool (2nd & 3rd floor),
                Dhaka-1205
              </span>
            </li>
            <li className="text-lightGray flex items-center gap-2 text-[0.625rem] leading-3 font-medium md:text-[1rem] md:leading-6 md:font-normal">
              <MdPhone className="shrink-0 text-sm md:text-lg" />
              <span>01511-900080</span>
            </li>
            <li className="text-lightGray flex items-center gap-2 text-[0.625rem] leading-3 font-medium md:text-[1rem] md:leading-6 md:font-normal">
              <MdEmail className="shrink-0 text-sm md:text-lg" />
              <span>sales@tilottoma.com</span>
            </li>
            {/* ===== social ===== */}
            <li className="mt-4 flex items-center space-x-4 text-white">
              <Link
                href="https://www.facebook.com/TilottomaOfficial"
                aria-label="Facebook"
                className="group flex h-5 w-5 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-white md:h-8 md:w-8"
              >
                <div className="group-hover:text-black">
                  <FaFacebookF className="text-[10px] md:text-sm" />
                </div>
              </Link>
              <Link
                href="https://www.instagram.com/tilottomaofficial"
                aria-label="Instagram"
                className="group flex h-5 w-5 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-white md:h-8 md:w-8"
              >
                <div className="group-hover:text-black">
                  <FaInstagram className="text-[10px] md:text-sm" />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/tilottomaofficial/"
                aria-label="Linkedin"
                className="group flex h-5 w-5 items-center justify-center rounded-full border border-[#E6E6E6] hover:bg-white md:h-8 md:w-8"
              >
                <div className="group-hover:text-black">
                  <FaLinkedinIn className="text-[10px] md:text-sm" />
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
