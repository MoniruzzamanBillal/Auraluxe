import Image, { StaticImageData } from "next/image";

import dummyImage from "../../../../public/microwave.png";
import dummyImage2 from "../../../../public/microwave2.png";
import dummyImage3 from "../../../../public/microwave3.png";

import plaveHolderImage from "../../../../public/placeholderImage.jpg";

const dummyImages = [dummyImage, dummyImage2, dummyImage3];

interface IPageProps {
  ProductImages: any;
  selectedImage: any;
  setSelectedImage: (image: StaticImageData) => void;
}

export default function ProductDetailGallery({
  ProductImages,
  selectedImage,
  setSelectedImage,
}: IPageProps) {
  return (
    <div>
      {/* main selected image  */}
      <div className="bg-smokeWhite sc-430:h-[350px] sc-500:h-[450px] relative flex h-[290px] w-full items-center justify-center overflow-hidden rounded-2xl">
        <div className="relative flex h-[calc(100%-80px)] w-[calc(100%-80px)] items-center justify-center">
          <Image
            src={selectedImage || plaveHolderImage}
            alt="image"
            width={1280}
            height={720}
            className="h-full w-full object-contain object-center"
          />
        </div>

        {/* <Image
          src={selectedImage}
          alt="productDetailImage"
          height={342}
          width={520}
          className="h-full w-full"
        /> */}
      </div>

      {/* all images  */}
      <div className="sc-500:gap-5 mt-5 flex flex-wrap items-center gap-2.5">
        {ProductImages?.map((image: any, idx: number) => (
          <div
            key={idx + 1}
            className={`h-[104px] w-[104px] cursor-pointer overflow-hidden rounded-lg border p-1 ${selectedImage === image ? "border-brandMain" : "border-transparent"} `}
            onClick={() => setSelectedImage(image)}
          >
            <div className="bg-smokeWhite relative h-full w-full overflow-hidden rounded-lg p-2">
              <Image
                src={image}
                alt="productImages"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* {dummyImages?.map((image, ind) => (
          <div
            key={ind}
            className={`cursor-pointer rounded-lg border p-1 ${selectedImage === image ? "border-brandMain" : "border-transparent"} `}
            onClick={() => setSelectedImage(image)}
          >
            <div className="bg-smokeWhite relative size-26 overflow-auto rounded-lg">
              <Image
                src={image}
                alt="productImages"
                fill
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
}
