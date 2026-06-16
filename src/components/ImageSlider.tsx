import { useState } from "react";

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

      <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-xl">

        No Image Available

      </div>

    );

  }

  return (

    <div>

      <div className="bg-white rounded-xl shadow p-4">

        <img
          src={images[currentImage].image_url}
          alt=""
          className="w-full h-[500px] object-contain"
        />

      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto">

        {

          images.map(
            (image, index) => (

              <img
                key={image.id}
                src={image.image_url}
                alt=""
                onClick={() => setCurrentImage(index)}
                className={`
                  w-20
                  h-20
                  object-contain
                  border
                  rounded-lg
                  cursor-pointer
                  p-1

                  ${
                    currentImage === index
                      ? "border-blue-600"
                      : "border-gray-200"
                  }
                `}
              />

            )
          )

        }

      </div>

    </div>

  );

};

export default ImageSlider;