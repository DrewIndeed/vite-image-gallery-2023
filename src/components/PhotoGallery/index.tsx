import {
  PlusIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { truncateString, data } from "@utils";
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

type ImageData = {
  name: string;
  imageUrl: string;
  description: string;
  idx: number;
};

const INIT_IMG_DATA = {
  name: "",
  imageUrl: "",
  description: "",
  idx: -1,
};

const PhotoGallery = () => {
  // states
  const [curImgData, setCurImgData] = useState<ImageData>(INIT_IMG_DATA);

  // methods
  const viewImage = (imageData: ImageData) => {
    setCurImgData(imageData);
  };
  const closeImage = () => {
    setCurImgData(INIT_IMG_DATA);
  };
  const prevImage = () => {
    const currentIdx = curImgData.idx;
    if (currentIdx === 0) {
      setCurImgData({ ...data[data.length - 1], idx: data.length - 1 });
      return;
    }
    setCurImgData({ ...data[currentIdx - 1], idx: currentIdx - 1 });
  };
  const nextImage = () => {
    const currentIdx = curImgData.idx;
    if (currentIdx === data.length - 1) {
      setCurImgData({ ...data[0], idx: 0 });
      return;
    }
    setCurImgData({ ...data[currentIdx + 1], idx: currentIdx + 1 });
  };

  return (
    <>
      {curImgData?.imageUrl && (
        <div className="viewer-wrapper">
          <div className="target-wrapper">
            <button
              onClick={() => closeImage()}
              className="btn btn-circle btn-error absolute top-[1rem] right-[1rem]"
              aria-label="Close viewing photo"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
            <div className="absolute top-[1rem] left-[1rem]">
              <h2 className="text-white font-bold text-[1.2em] md:text-[1.5em]">
                {truncateString(curImgData?.name, 25)}
              </h2>
              <h3 className="text-white text-[0.9em] md:text-[1em]">
                {truncateString(curImgData?.description, 25)}
              </h3>
            </div>
            <img
              className="viewer-target"
              key={curImgData.name}
              src={curImgData.imageUrl}
              alt={curImgData.description}
            />
            <button
              onClick={() => prevImage()}
              className="jump-btn left-[1rem]"
              aria-label="View previous photo"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={() => nextImage()}
              className="jump-btn right-[1rem]"
              aria-label="View next photo"
            >
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

      <div className="gallery-wrapper">
        <div className="title">
          <h1>My Photo Gallery</h1>
          <button className="btn btn-circle" aria-label="Add more photo">
            <PlusIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry className="masonry" gutter="1rem">
            {data.map((image, idx) => (
              <img
                className="item-images"
                key={image.name}
                src={image.imageUrl}
                alt={image.description}
                onClick={() => viewImage({ ...image, idx })}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default PhotoGallery;
