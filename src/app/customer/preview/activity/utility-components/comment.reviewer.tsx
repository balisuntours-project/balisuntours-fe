"use client";
import { DetailActivityReviewParamater } from "@/app/paramaters/activity/paramater";
import { ActivityReviewResponse } from "@/app/responses/activity-review/response";
import { ProfilePictureReviewer } from "./profile-picture.reviewer";
import { GlobalUtility } from "@/lib/global.utility";
import { Star } from "lucide-react";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { useEffect, useState } from "react";

export function CommentReviewer(props: {
  review: ActivityReviewResponse;
  forPopUp?: boolean;
}) {
  const [maxTextShow, setMaxTextShow] = useState(150);
  useEffect(() => {
    if (!GlobalUtility.CheckScreenOnMobile()) {
      setMaxTextShow(200);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 md:px-0 md:gap-3">
        <div className="flex gap-1">
          <ProfilePictureReviewer review={props.review} />

          <div className="flex flex-col justify-center">
            <div className="flex flex-col lg:flex-row md:gap-1 -mb-1 md:mb-0">
              <span
                className={`font-bold text-sm md:text-base ${
                  props.forPopUp && "text-white"
                }`}
              >
                {props.review.name}
              </span>
              <span className="text-sm md:text-base text-gray-400">
                ({GlobalUtility.FormatBeautifullDate(props.review.created_at)})
              </span>
            </div>
            <div className="flex pt-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={` w-4 h-4 stroke-[1.5] ${
                    index < props.review.total_star
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  fill={
                    index < props.review.total_star ? "currentColor" : "none"
                  }
                />
              ))}
            </div>
          </div>
        </div>
        {props.review.comment && (
          <div className="text-sm md:text-base">
            <p
              className={`${
                props.forPopUp
                  ? "text-white"
                  : "text-ellipsis line-clamp-4 md:line-clamp-5"
              }`}
            >
              {props.review.comment}
            </p>
            {!props.forPopUp && props.review.comment.length > maxTextShow && (
              <span className="text-blue-500 underline">
                Click to read more
              </span>
            )}
          </div>
        )}

        {props.review.review_galleries &&
          props.review.review_galleries.length > 0 && (
            <div className="flex gap-3">
              {props.review.review_galleries.map((gallery, key) => (
                <div key={key} className="col-span-1">
                  <ImageWithLoader
                    src={gallery.files.url}
                    alt={`Beautifull Moment`}
                    fallbackSrc="/fallback-image.png"
                    classNameProp="rounded-md w-[250px] h-[120px] md:h-[150px] object-cover"
                    skeletonClassName="rounded-md"
                    priority={false} // Gambar ini tidak diberi prioritas
                    width={250}
                    height={150}
                  />
                </div>
              ))}
            </div>
          )}
      </div>
    </>
  );
}
