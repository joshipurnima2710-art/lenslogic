import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

type Props = {
  images: {
    id: number;
    image_url: string;
  }[];
};

const ImageSlider = ({
  images,
}: Props) => {

  const [currentImage, setCurrentImage] =
    useState(0);

  if (!images || images.length === 0) {
    return (
      <div
        className="
          flex
          items-center
          justify-center
          h-[600px]
          rounded-3xl
          bg-gray-50
          border
          border-gray-200
        "
      >
        <div className="text-gray-500 text-lg">
          No Image Available
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage(
      (prev) =>
        prev === images.length - 1
          ? 0
          : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) =>
        prev === 0
          ? images.length - 1
          : prev - 1
    );
  };

  return (
    <div className="space-y-5">

      {/* Main Image */}
      <div
        className="
          relative
          bg-white
          rounded-3xl
          border
          border-gray-100
          overflow-hidden
        "
      >
        <img
          src={images[currentImage].image_url}
          alt=""
          className="
            w-full
            h-[550px]
            object-contain
            p-8
            transition-all
            duration-300
          "
        />

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={prevImage}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white
              shadow-lg
              flex
              items-center
              justify-center
              hover:bg-[#10B981]
              hover:text-white
              transition
            "
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white
              shadow-lg
              flex
              items-center
              justify-center
              hover:bg-[#10B981]
              hover:text-white
              transition
            "
          >
            <ChevronRight size={22} />
          </button>
        )}

      </div>

      {/* Thumbnails */}
      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
        "
      >
        {images.map(
          (
            image,
            index
          ) => (
            <button
              key={image.id}
              onClick={() =>
                setCurrentImage(index)
              }
              className={`
                min-w-[90px]
                h-[90px]
                rounded-2xl
                border-2
                overflow-hidden
                transition-all
                duration-200
                bg-white

                ${
                  currentImage === index
                    ? `
                      border-[#10B981]
                      shadow-md
                      scale-105
                    `
                    : `
                      border-gray-200
                      hover:border-[#10B981]
                    `
                }
              `}
            >
              <img
                src={image.image_url}
                alt=""
                className="
                  w-full
                  h-full
                  object-contain
                  p-2
                "
              />
            </button>
          )
        )}
      </div>

      {/* Image Counter */}
      <div className="text-center text-sm text-gray-500">
        {currentImage + 1} / {images.length}
      </div>

    </div>
  );
};

export default ImageSlider;