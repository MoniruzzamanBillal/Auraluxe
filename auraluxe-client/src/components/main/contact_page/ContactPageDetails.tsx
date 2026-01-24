"use client";
import Heading from "@/components/share/common/Heading";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import FaqComp from "./ FaqComp";

export default function ContactPageDetails() {
  const [selectedLocation, setSelectedLocation] =
    useState<string>("Auraluxe Gulshan");

  // console.log("selected location => ", selectedLocation);

  const Locations = [
    {
      locationName: "Auraluxe Gulshan",
      locationMapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4710.714756691834!2d90.4109392!3d23.794225399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c72f6bd57fb9%3A0x27ba5b928c803bf4!2sTilottoma%20Gulshan!5e1!3m2!1sen!2sbd!4v1764129471823!5m2!1sen!2sbd",
    },
    {
      locationName: "Auraluxe Hatirpool",
      locationMapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4712.567732397341!2d90.39197349999999!3d23.7430603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8be5acf6e6f%3A0x4a074a21ec78596a!2sTilottoma%20Trade%20Center!5e1!3m2!1sen!2sbd!4v1764129377470!5m2!1sen!2sbd",
    },
    {
      locationName: "Auraluxe Uttara",
      locationMapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4707.804153102774!2d90.38220609999999!3d23.874385599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5b8e7105f5b%3A0xb13a4f1caf067de1!2sTILOTTOMA%20UTTARA!5e1!3m2!1sen!2sbd!4v1764129483849!5m2!1sen!2sbd",
    },
    {
      locationName: "Auraluxe Chittagong",
      locationMapUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d595.19237158908!2d91.8248243!3d22.350888!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd897c64c6827%3A0x36997fabb0288f4f!2sTilottoma%20Chattogram!5e1!3m2!1sen!2sbd!4v1764129493394!5m2!1sen!2sbd",
    },
  ];

  const activeLocation = Locations.find(
    (data: any) =>
      data.locationName.toLowerCase() === selectedLocation.toLowerCase(),
  );

  // console.log("activeLocation =>>", activeLocation);

  return (
    <div className="flex flex-col gap-10">
      {/* ======= heading ======== */}
      <div className="relative z-100">
        <Heading
          firstText="Our"
          secondText="Store & Branches"
          backText="Store"
          descripiton="We take pride in serving you through our conveniently located stores and branches. Whether you're looking for our latest products, personalized assistance."
        />
      </div>
      {/* ===== store location ======= */}
      <div className="mx-auto mb-10 w-full max-w-[1537px] p-4 md:mt-10 md:mb-28">
        <div className="contact-shadow grid grid-cols-1 gap-6 rounded-[20px] border border-gray-200 border-t-gray-200 xl:h-screen xl:max-h-[554px] xl:grid-cols-3">
          {/* Main Experience Center Card */}
          <div className="relative min-h-80 w-full overflow-hidden rounded-2xl xl:col-span-1 xl:w-[495px] xl:rounded-r-none">
            {/*====== location =======*/}
            <div className="relative z-10 flex h-full flex-col justify-center">
              <iframe
                src={activeLocation?.locationMapUrl}
                width="100%"
                height="100%"
                allowFullScreen={true}
                loading="lazy"
                title={activeLocation?.locationName}
                style={{ border: 0 }}
              ></iframe>
            </div>
          </div>

          {/*============ Location Cards Grid ==========*/}
          <div className="grid lg:grid-cols-2 xl:col-span-2 xl:ml-32">
            {/*========= Auraluxe gulshan ========*/}
            <div className="flex flex-col justify-center">
              <StoreLocation
                title={"Auraluxe Gulshan"}
                location={
                  "Baro Bhuiyan, Plot No #3/A, Road No # 49, Gulshan 2, Dhaka, 1212"
                }
                phone={"01511-900080"}
                setSelectedLocation={setSelectedLocation}
              />
            </div>

            {/*======== Auraluxe Hatirpool =========*/}
            <div className="flex flex-col justify-center">
              <StoreLocation
                title={"Auraluxe Hatirpool"}
                location={
                  "67, Bir Uttam C.R Dutt Road, Hatirpool, Dhaka - 1205"
                }
                phone={"01340709250"}
                setSelectedLocation={setSelectedLocation}
              />
            </div>

            {/*========= Auraluxe Uttara ========*/}
            <div className="">
              <StoreLocation
                title={"Auraluxe Uttara"}
                location={"Plot No: 18, Road Sonargaon Janapath, Dhaka - 1230"}
                phone={"01329718828"}
                setSelectedLocation={setSelectedLocation}
              />
            </div>

            {/*====== Auraluxe Chittagong =========*/}
            <StoreLocation
              title={"Auraluxe Chittagong"}
              location={"95 Chatteswari Road, Chittagong"}
              phone={"01329718827"}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
        </div>
      </div>
      {/* ======== faq part ========== */}
      <div>
        <FaqComp />
      </div>
    </div>
  );
}

type StoreProps = {
  title: string;
  location: string;
  phone: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
};

const StoreLocation = ({
  title,
  location,
  phone,
  setSelectedLocation,
}: StoreProps) => {
  return (
    <div className="p-6">
      <button
        onClick={() => {
          setSelectedLocation(title);
        }}
        className="md:text--[1rem] text-charcoolGray relative mb-4 cursor-pointer text-sm font-bold lg:text-lg lg:leading-7"
      >
        <p className="bg-brandMain absolute bottom-0 h-[2px] w-[40px] sm:w-[57px]"></p>
        {title}
      </button>

      <div className="space-y-3">
        <div className="flex items-center space-x-7">
          <FaLocationDot className="h-4 w-4 flex-shrink-0 text-[#DD5471]" />
          <p className="text-darkGray text-xs md:text-sm">{location}</p>
        </div>

        <div className="flex items-center space-x-7">
          <FaPhoneAlt className="h-4 w-4 flex-shrink-0 text-[#DD5471]" />
          <p className="text-darkGray text-xs md:text-sm">{phone}</p>
        </div>
      </div>
    </div>
  );
};
