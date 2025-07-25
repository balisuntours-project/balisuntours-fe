// import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { DetailActivityReviewParamater } from "@/app/paramaters/activity/paramater";
// import { Star } from "lucide-react";
import Link from "next/link";
// import { ProfilePictureReviewer } from "../../utility-components/profile-picture.reviewer";
import { GlobalUtility } from "@/lib/global.utility";
import { BlankBlackDialog } from "@/app/global-components/utility-components/blank-black.dialog";
import { CommentReviewer } from "../utility-components/comment.reviewer";

export function DetailActivityReviews(props: DetailActivityReviewParamater) {
  return (
    <>
      <div className="mt-6">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          What People Say
          <span className="text-base lg:text-xl ms-1 font-bold text-gray-400">
            (5 Newest Reviews)
          </span>
        </h2>
        {props.reviews && props.reviews.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-11">
            {props.reviews.map((review, key) => (
              <div
                key={key}
                className="flex flex-col gap-2 md:gap-3 col-span-2 cursor-pointer"
              >
                <BlankBlackDialog
                  content={<CommentReviewer review={review} forPopUp={true} />}
                >
                  <CommentReviewer review={review} />
                </BlankBlackDialog>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg lg:text-xl font-normal text-gray-400">
            No reviews yet...
          </p>
        )}

        {props.more_reviews_url &&
        GlobalUtility.IsValidUrl(props.more_reviews_url) ? (
          <div className="flex justify-center items-center mt-8">
            <Link
              href={props.more_reviews_url}
              target="__blank"
              rel="noopener noreferrer"
              className="border-solid border-2 border-[#65AD2E] hover:bg-[#65AD2E] hover:text-[white] text-[#65AD2E] font-bold py-2 px-4 rounded w-3/4 md:w-2/4 lg:w-1/4 text-center"
            >
              See More Reviews?
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-8">
            <Link
              href="#"
              className="border-solid border-2 border-[#65AD2E] hover:bg-[#65AD2E] hover:text-[white] text-[#65AD2E] font-bold py-2 px-4 rounded w-3/4 md:w-2/4 lg:w-1/4 text-center"
            >
              See More Reviews?
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
