"use client";

import { ActivityPackageTypeEnum } from "@/app/enums/activity/activity.enum";
import { GoogleMapDialogComponent } from "@/app/global-components/utility-components/google-map.dialog";
import { ImageWithLoader } from "@/app/global-components/utility-components/with-loader.image";
import { BookingPackageDetailResponse } from "@/app/responses/booking/response";
import { GlobalUtility } from "@/lib/global.utility";
import Link from "next/link";

function PackageTypeMechanism({
  item,
}: {
  item: BookingPackageDetailResponse;
}) {
  if (item.package_type == ActivityPackageTypeEnum.pickupTimeByTraveller) {
    return (
      <>
        <div className="flex flex-col gap-1 text-start">
          <span className="text-lg font-bold text-black">
            {item.activity_title}
          </span>
          <span className="text-sm text-gray-500">{item.package_title}</span>
          <span className="text-sm text-gray-500">{item.activity_date}</span>
          {item.pickup_location ? (
            <span className="text-sm text-gray-500 flex flex-wrap">
              Pickup location:
              {item.pickup_coordinate_object ? (
                <GoogleMapDialogComponent
                  lat={item.pickup_coordinate_object.lat}
                  lng={item.pickup_coordinate_object.lng}
                >
                  <span className="text-black underline cursor-pointer ml-1">
                    {item.pickup_location}
                  </span>
                </GoogleMapDialogComponent>
              ) : (
                <span className="text-black underline cursor-pointer ml-1">
                  {item.pickup_location}
                </span>
              )}
            </span>
          ) : (
            <span className="text-sm text-gray-500 block">
              Pickup location:
              <span className="text-black underline cursor-pointer ml-1">
                Meet at venue
              </span>
            </span>
          )}

          <span className="text-sm text-gray-500">
            Pickup time: {item.pickup_time ?? "-"}
          </span>
          <span className="text-sm text-gray-500">
            Planned place: {item.planned_place_to_visit ?? "-"}
          </span>
          <span className="text-sm text-gray-500">
            Note: {item.note ?? "-"}
          </span>
          <Link
            target="__blank"
            href={`/customer/preview/activity/${item.activity_slug}?package=${GlobalUtility.StringToSlugEncodedString(
              item.package_title
            )}&target=itinerary`}
            className="text-black underline cursor-pointer text-sm"
          >
            See activity
          </Link>
        </div>
      </>
    );
  } else if (
    item.package_type == ActivityPackageTypeEnum.pickupTimeByTeam
  ) {
    return (
      <>
        <div className="flex flex-col gap-1 text-start">
          <span className="text-lg font-bold text-black">
            {item.activity_title}
          </span>
          <span className="text-sm text-gray-500">{item.package_title}</span>
          <span className="text-sm text-gray-500">{item.activity_date}</span>
          {item.pickup_location ? (
            <span className="text-sm text-gray-500 flex flex-wrap">
              Pickup location:
              {item.pickup_coordinate_object ? (
                <GoogleMapDialogComponent
                  lat={item.pickup_coordinate_object.lat}
                  lng={item.pickup_coordinate_object.lng}
                >
                  <span className="text-black underline cursor-pointer ml-1">
                    {item.pickup_location}
                  </span>
                </GoogleMapDialogComponent>
              ) : (
                <span className="text-black underline cursor-pointer ml-1">
                  {item.pickup_location}
                </span>
              )}
            </span>
          ) : (
            <span className="text-sm text-gray-500 block">
              Pickup location:
              <span className="text-black underline cursor-pointer ml-1">
                Meet at venue
              </span>
            </span>
          )}

          <span className="text-sm text-gray-500">
            Selected pickup time: {item.pickup_time ?? "-"}
          </span>

          <Link
            target="__blank"
            href={`/customer/preview/activity/${item.activity_slug}?package=${GlobalUtility.StringToSlugEncodedString(
              item.package_title
            )}&target=itinerary`}
            className="text-black underline cursor-pointer text-sm"
          >
            See activity
          </Link>
        </div>
      </>
    );
  } else if (item.package_type == ActivityPackageTypeEnum.freeTour) {
    return (
      <>
        <div className="flex flex-col gap-1 text-start">
          <span className="text-lg font-bold text-black">
            {item.activity_title}
          </span>
          <span className="text-sm text-gray-500">{item.package_title}</span>
          <span className="text-sm text-gray-500">{item.activity_date}</span>
          <span className="text-sm text-gray-500">
            Selected pickup time: {item.pickup_time ?? "-"}
          </span>
          <span className="text-sm text-gray-500">
            Planned place: {item.planned_place_to_visit ?? "-"}
          </span>
          <span className="text-sm text-gray-500">
            Note: {item.note ?? "-"}
          </span>
          <span className="text-sm text-gray-500">
            How much is worth for you ({item.free_tour_person}):{" "}
            {GlobalUtility.IdrCurrencyFormat(item.free_tour_traveller_spend)}
          </span>

          <Link
            target="__blank"
            href={`/customer/preview/activity/${item.activity_slug}?package=${GlobalUtility.StringToSlugEncodedString(
              item.package_title
            )}&target=itinerary`}
            className="text-black underline cursor-pointer text-sm"
          >
            See activity
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col gap-1 text-start">
          <span className="text-lg font-bold text-black">
            {item.activity_title}
          </span>
          <span className="text-sm text-gray-500">{item.package_title}</span>
          <span className="text-sm text-gray-500">{item.activity_date}</span>

          <span className="text-sm text-gray-500">
            Meet Up Detail: {item.departure_title ?? "-"}
          </span>
          {item.pickup_location ? (
            <span className="text-sm text-gray-500 flex flex-wrap">
              Venue:
              {item.pickup_coordinate_object ? (
                <GoogleMapDialogComponent
                  lat={item.pickup_coordinate_object.lat}
                  lng={item.pickup_coordinate_object.lng}
                >
                  <span className="text-black underline cursor-pointer ml-1">
                    {item.pickup_location}
                  </span>
                </GoogleMapDialogComponent>
              ) : (
                <span className="text-black underline cursor-pointer ml-1">
                  {item.pickup_location}
                </span>
              )}
            </span>
          ) : (
            <span className="text-sm text-gray-500 block">
              Pickup location:
              <span className="text-black underline cursor-pointer ml-1">
                Meet at venue
              </span>
            </span>
          )}

          <span className="text-sm text-gray-500">
            Selected meetup time: {item.pickup_time ?? "-"}
          </span>
          <Link
            target="__blank"
            href={`/customer/preview/activity/${item.activity_slug}?package=${GlobalUtility.StringToSlugEncodedString(
              item.package_title
            )}&target=itinerary`}
            className="text-black underline cursor-pointer text-sm"
          >
            See activity
          </Link>
        </div>
      </>
    );
  }
}

export function PopupDetailBooking({
  item,
}: {
  item: BookingPackageDetailResponse;
}) {
  return (
    <>
      <div className="flex-col gap-4 mb-6">
        <div className=" p-4 rounded-xl border-2">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="col-span-2 max-w-full md:max-w-[200px] w-full">
              <ImageWithLoader
                src={item.main_photo}
                alt={`Activity banner`}
                fallbackSrc="/fallback-image.png"
                classNameProp="rounded-lg w-full mx-auto md:mx-0  h-[150px] md:w-[200px] md:h-[200px] object-cover"
                skeletonClassName="rounded-lg"
                priority={false} // Gambar ini tidak diberi prioritas
                width={150}
                height={150}
              />
            </div>

            <div className="col-span-3 ">
              <PackageTypeMechanism item={item} />
            </div>
          </div>

          <hr className="my-4" />
          {item.prices.map((price, key) => (
            <div className="flex" key={key}>
              <span className="text-bold text-start">{price.title}</span>

              <span className="text-bold text-end ml-auto">x {price.qty}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
