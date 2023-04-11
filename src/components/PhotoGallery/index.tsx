import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { data, truncateString } from "@utils";
import { useState } from "react";
import {
  LazyLoadImage
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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

const getDataInfo = (dataRs: ImageData[]) => {
  const urlsUnique = [
    ...new Set(Object.values(dataRs).map((imgItem) => imgItem.imageUrl)),
  ];
  return {
    totalCount: data.length,
    uniqueUrlCount: urlsUnique.length,
    lastIndex: data.length - 1,
  };
};

let loadedCount = 0;
const PhotoGallery = () => {
  // states
  const [curImgData, setCurImgData] = useState<ImageData>(INIT_IMG_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTargetLoading, setIsTargetLoading] = useState<boolean>(false);
  const [loadingPercent, setLoadingPercent] = useState<number>(0);

  // methods
  const dataInfo = getDataInfo(data as ImageData[]);
  const viewImage = (imageData: ImageData) => setCurImgData(imageData);
  const closeImage = () => setCurImgData(INIT_IMG_DATA);
  const prevImage = () => {
    setIsTargetLoading(true);
    const currentIdx = curImgData.idx;
    if (currentIdx === 0) {
      setCurImgData({ ...data[dataInfo.lastIndex], idx: dataInfo.lastIndex });
      return;
    }
    setCurImgData({ ...data[currentIdx - 1], idx: currentIdx - 1 });
  };
  const nextImage = () => {
    setIsTargetLoading(true);
    const currentIdx = curImgData.idx;
    if (currentIdx === dataInfo.lastIndex) {
      setCurImgData({ ...data[0], idx: 0 });
      return;
    }
    setCurImgData({ ...data[currentIdx + 1], idx: currentIdx + 1 });
  };

  return (
    <>
      {/* target image viewer */}
      {curImgData?.imageUrl && (
        <div className="viewer-wrapper">
          <div className="target-wrapper">
            {/* X mark closing icon */}
            <button
              onClick={() => closeImage()}
              className="btn btn-circle btn-ghost absolute top-[1.3rem] right-[1rem]"
              aria-label="Close viewing photo"
            >
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>

            {/* name and descriptions */}
            <div className="absolute top-[1rem] left-[1rem]">
              <h2 className="text-white font-bold text-[1.2em] md:text-[1.5em]">
                {truncateString(curImgData?.name, 25)}
              </h2>
              <h3 className="text-white text-[0.9em] md:text-[1em]">
                {truncateString(curImgData?.description, 25)}
              </h3>
            </div>

            {/* loading when a photo is chosen to view */}
            {isTargetLoading && (
              <div className="text-white text-[1em] md:text-[1.5em] absolute top-[50%]">
                <div className="loading-holder">
                  <div
                    className="inline-block h-12 w-12 animate-spin rounded-full 
                    border-4 border-solid border-current border-r-transparent 
                    align-[-0.125em] motion-reduce:animate-[spin_1.3s_linear_infinite]"
                    role="status"
                  ></div>
                </div>
              </div>
            )}

            {/* viewing image */}
            <LazyLoadImage
              className="h-[500px] sm:h-[600px] md:h-[800px]"
              style={{
                objectFit: "contain",
                width: "100%",
                margin: 0,
                padding: 0,
                opacity: isTargetLoading ? 0 : 1,
              }}
              effect="blur"
              key={curImgData.name}
              src={curImgData.imageUrl}
              alt={curImgData.description}
              afterLoad={() => {
                setIsTargetLoading(false);
              }}
            />

            {/* back to previous image */}
            <button
              onClick={() => prevImage()}
              className="jump-btn left-[1rem]"
              aria-label="View previous photo"
            >
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </button>

            {/* jump to next image */}
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

      {/* main photo gallery */}
      <div className="gallery-wrapper">
        {/* title and add more button */}
        <div className="title">
          <h1>My Photo Gallery</h1>
          <button className="btn btn-circle" aria-label="Add more photo">
            <PlusIcon className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* loading screen for all photos */}
        {isLoading && (
          <div className="loading-holder">
            <div
              className="inline-block h-12 w-12 animate-spin rounded-full 
              border-4 border-solid border-current border-r-transparent 
              align-[-0.125em] motion-reduce:animate-[spin_1.3s_linear_infinite]"
              role="status"
            ></div>
            Loading {loadingPercent}%
          </div>
        )}

        {/* responsive gallery */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 900: 3 }}>
          <Masonry className="masonry" gutter="1rem">
            {data.map((image, idx) => {
              const w = image.imageUrl.split("/").at(-2);
              const h = image.imageUrl.split("/").at(-1);
              return (
                <LazyLoadImage
                  placeholder={<span>Loading item ...</span>}
                  className="w-full block
                    !transition-all !duration-500 !ease-in-out
                    hover:grayscale-[80%] 
                    hover:brightness-[80%] 
                    hover:cursor-pointer"
                  effect="blur"
                  width="750"
                  height="750"
                  key={image.name}
                  src={image.imageUrl}
                  alt={image.description}
                  onClick={() => {
                    setIsTargetLoading(true);
                    viewImage({ ...image, idx });
                  }}
                  afterLoad={() => {
                    loadedCount++;
                    const currenyLoadingPercent = Math.floor(
                      (loadedCount / dataInfo.totalCount) * 100
                    );
                    // console.log(currenyLoadingPercent);

                    setLoadingPercent(Math.floor(currenyLoadingPercent));
                    if (currenyLoadingPercent === 100)
                      setTimeout(() => {
                        setIsLoading(false);
                      }, 600);
                  }}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default PhotoGallery;
