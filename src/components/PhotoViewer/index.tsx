import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { truncateString } from "@utils";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const loader = (
  <div
    className="inline-block h-12 w-12 animate-spin rounded-full 
    border-4 border-solid border-current border-r-transparent 
    align-[-0.125em] motion-reduce:animate-[spin_1.3s_linear_infinite]"
    role="status"
  ></div>
);

const PhotoViewer = ({
  imageData,
  isTargetLoading,
  setIsTargetLoading,
  handleClose,
  handlePrev,
  handleNext,
}: any) => {
  return (
    <div className="viewer-wrapper">
      <div className="target-wrapper">
        {/* X mark closing icon */}
        <button
          onClick={handleClose}
          className="btn btn-circle btn-ghost absolute top-[1.3rem] right-[1rem]"
          aria-label="Close viewing photo"
        >
          <XMarkIcon className="h-6 w-6 text-white" />
        </button>

        {/* name and descriptions */}
        <div className="absolute top-[1rem] left-[1rem]">
          <h2 className="text-white font-bold text-[1.2em] md:text-[1.5em]">
            {truncateString(imageData?.name, 25)}
          </h2>
          <h3 className="text-white text-[0.9em] md:text-[1em]">
            {truncateString(imageData?.description, 25)}
          </h3>
        </div>

        {/* loading when a photo is chosen to view */}
        {isTargetLoading && (
          <div className="text-white text-[1em] md:text-[1.5em] absolute top-[50%]">
            {loader}
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
          key={imageData.name}
          src={imageData.imageUrl}
          alt={imageData.description}
          afterLoad={() => setIsTargetLoading(false)}
        />

        {/* back to previous image */}
        <button
          onClick={handlePrev}
          className="jump-btn left-[1rem]"
          aria-label="View previous photo"
        >
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </button>

        {/* jump to next image */}
        <button
          onClick={handleNext}
          className="jump-btn right-[1rem]"
          aria-label="View next photo"
        >
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default PhotoViewer;
