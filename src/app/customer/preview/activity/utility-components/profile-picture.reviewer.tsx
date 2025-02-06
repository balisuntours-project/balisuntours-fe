"use client";

import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { ActivityReviewResponse } from "@/app/responses/activity-review/response";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ProfilePictureReviewer({
  review,
}: {
  review: ActivityReviewResponse;
}) {
  const name = review.name as string;
  const nameReducer = (name: string) => {
    const split = name.split(" ");
    if (split[1] === undefined) {
      return name.slice(0, 2);
    }
    return split[0][0] + split[1][0];
  };

  const initials = nameReducer(name);

  return (
    <>
      <div>
        {review.user?.avatar?.url || review.fake_profile ? (
          <ImageWithLoader
            src={review.user?.avatar?.url || (review.fake_profile as string)}
            alt={`profile-pic ${review.name + 1}`}
            classNameProp="w-12 h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 rounded-full object-cover"
            skeletonClassName="rounded-full"
            fallbackSrc="/fallback-image.png"
            priority={false} // Gambar ini tidak diberi prioritas
            width={48}
            height={48}
          />
        ) : (
          <Avatar className="w-11 h-11">
            <AvatarFallback className="uppercase bg-[#eb5e00] text-background text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          //   <Image
          //     src={`https://ui-avatars.com/api/?background=EB5E00&rounded=true&color=fff&name=${review.name}`}
          //     alt={`profile-pic ${review.name + 1}`}
          //     width={48}
          //     height={48}
          //     className="w-11 h-11 md:w-12 md:h-12 lg:w-11 lg:h-11 rounded-full object-cover"
          //     loading="lazy"
          //   />
        )}
      </div>
    </>
  );
}
