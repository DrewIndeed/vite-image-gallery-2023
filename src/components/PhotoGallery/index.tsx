import { loader } from "@components/PhotoViewer";
import { PlusIcon } from "@heroicons/react/24/solid";
import { data } from "@utils";
import React, { Suspense } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const PhotoViewer = React.lazy(() => import("../PhotoViewer"));
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
        <Suspense fallback={<div>Loading viewer...</div>}>
          <PhotoViewer
            imageData={curImgData}
            handleClose={closeImage}
            handlePrev={prevImage}
            handleNext={nextImage}
            isTargetLoading={isTargetLoading}
            setIsTargetLoading={setIsTargetLoading}
          />
        </Suspense>
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

        <div className={`loading-holder ${!isLoading && "fadeOut"}`}>
          {loader}
          Loading {loadingPercent}%
        </div>

        {/* responsive gallery */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 900: 3 }}>
          <Masonry className="masonry" gutter="1rem">
            {data.map((image, idx) => {
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
