"use client";
import {
  DraggableComponent,
  SortableItem,
} from "@/app/global-components/utility-components/draggable.component";
import {
  defaultDraggableScopedState,
  DraggableType,
  useDraggableStore,
} from "@/app/store/draggable.store";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { StarRating } from "./start-rating.form";
import { useEffect, useRef, useState } from "react";
import { ReviewGalleryParamater } from "@/app/paramaters/activity-review/paramater";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { ReviewImage } from "./review-image.image";
import { useBookingStore } from "@/app/store/booking.store";
import { useToast } from "@/hooks/use-toast";
import { ReviewValidPayloadEnum } from "@/app/enums/booking/booking.enum";
import { BookingPackageDetailResponse } from "@/app/responses/booking/response";

export function ReviewBookingForm({
  packageId,
  packageDetail,
}: {
  orderId: string;
  packageId: string;
  packageDetail: BookingPackageDetailResponse;
}) {
  const { toast } = useToast();
  const [totalStar, setTotalStar] = useState<number>(5);
  const setDraggableScopedState = useDraggableStore(
    (state) => state.setScopedState
  );
  const setReviewItems = useBookingStore((state) => state.setReviewItems);
  const isOnSubmit = useBookingStore((state) => state.isOnSubmit);
  const setIsOnSubmit = useBookingStore((state) => state.setIsOnSubmit);

  const scopedState = useDraggableStore(
    (state) =>
      state.draggableScopedStates[packageId] || defaultDraggableScopedState
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      let newOrder = scopedState.selectedDraggable.length - 1;

      let reviewGalleryLength = scopedState.selectedDraggable.length;
      const newImages = filesArray
        .filter((file) => {
          reviewGalleryLength += 1;
          if (file.size > 7 * 1024 * 1024) {
            toast({
              description: `Photo size over 7mb, post smaller one!`,
              variant: "warning",
            });
            return false; // Skip file jika ukurannya terlalu besar
          } else if (reviewGalleryLength > 6) {
            toast({
              description: `Max 6 photo of your best momment!`,
              variant: "warning",
            });
            return false;
          }
          return true; // Lolos filter jika ukuran valid
        })
        .map((file, index) => {
          const imageUrl = URL.createObjectURL(file);

          const galleryData: ReviewGalleryParamater = {
            src: imageUrl,
            file: file,
            title: "",
          };

          newOrder += 1;

          return {
            id: newOrder,
            data: galleryData,
            content: (
              <div className="w-24 h-24 relative border rounded-md overflow-hidden group">
                {/* Gambar */}
                <Image
                  src={imageUrl}
                  alt={`Uploaded ${index}`}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />

                {/* Tombol Trash */}
                <span className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Trash2 className="text-white w-6 h-6" />
                </span>
              </div>
            ),
          };
        });

      // Tambahkan gambar baru ke state
      //setItems((prevItems) => [...prevItems, ...newImages as DraggableType<ReviewGalleryParamater>[]]);
      const prevItems = scopedState.selectedDraggable;
      const newGalleryItems = [
        ...prevItems,
        ...(newImages as DraggableType<ReviewGalleryParamater>[]),
      ];
      setDraggableScopedState(packageId, "selectedDraggable", newGalleryItems);
    }
  };

  const handleUpdatetotalStar = (newStar: number) => {
    setTotalStar(newStar);
    setReviewItems((prevReviews) => ({
      ...prevReviews,
      [packageId]: {
        ...prevReviews[packageId],
        total_star: newStar,
      },
    }));
  };

  useEffect(() => {
    if (scopedState.selectedDraggable) {
      const mappingReviewGalleriesData: {
        [key: string | number]: Omit<ReviewGalleryParamater, "src">;
      } = scopedState.selectedDraggable.reduce((acc, item, index) => {
        const itemData = item.data as ReviewGalleryParamater;
        acc[index] = {
          title: itemData.title ?? "",
          file: itemData.file,
        };
        return acc;
      }, {} as { [key: string | number]: Omit<ReviewGalleryParamater, "src"> });

      setReviewItems((prevReviews) => ({
        ...prevReviews,
        [packageId]: {
          ...prevReviews[packageId],
          review_galleries: mappingReviewGalleriesData,
        },
      }));
    }
  }, [scopedState.selectedDraggable]);

  const nameRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [nameValid, setNameValid] = useState(true);
  const [commentValid, setCommentValid] = useState(true);

  useEffect(() => {
    setReviewItems((prevReviews) => ({
      ...prevReviews,
      [packageId]: {
        activity_uuid: packageDetail.activity_uuid,
        name: "",
        comment: "",
        total_star: 5,
        review_galleries: {},
      },
    }));
  }, [packageId]);

  useEffect(() => {
    if (isOnSubmit) {
      setIsOnSubmit(false);
      // Validasi Nama
      if (nameRef.current) {
        const isNameValid =
          nameRef.current.value.length >=
          ReviewValidPayloadEnum.minCharacterName;
        setNameValid(isNameValid);
      }

      // Validasi Komentar
      if (commentRef.current) {
        const isCommentValid =
          commentRef.current.value.length >=
          ReviewValidPayloadEnum.minCharacterComment;
        setCommentValid(isCommentValid);
      }
    }
  }, [isOnSubmit]);

  const handleNameChange = () => {
    if (nameRef.current) {
      setNameValid(nameRef.current.value.length >= 3);
      setReviewItems((prevReviews) => ({
        ...prevReviews,
        [packageId]: {
          ...prevReviews[packageId],
          name: nameRef.current?.value ?? "",
        },
      }));
    }
  };

  const handleCommentChange = () => {
    if (commentRef.current) {
      setCommentValid(commentRef.current.value.length >= 25);
      setReviewItems((prevReviews) => ({
        ...prevReviews,
        [packageId]: {
          ...prevReviews[packageId],
          comment: commentRef.current?.value ?? "",
        },
      }));
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>
            Add your review for {packageDetail.package_title}
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Let us know your experience {packageDetail.package_title}, it
            totally optional you can ignore this review form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid w-full md:items-center gap-4">
              <div className="flex flex-col items-start">
                <Label className="text-gray-700 text-sm font-semibold text-start">
                  Name Shown
                </Label>
                <Input
                  ref={nameRef}
                  className="border text-sm md:text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mr Gruu"
                  type="text"
                  onChange={handleNameChange}
                />
                {!nameValid && (
                  <span className="text-red-500 text-sm">
                    Enter a valid name!
                  </span>
                )}
              </div>

              <div className="flex flex-col items-start">
                <Label className="text-gray-700 text-sm font-semibold text-start">
                  Review
                </Label>
                <Textarea
                  ref={commentRef}
                  className="border text-sm md:text-base border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your best moment"
                  onChange={handleCommentChange}
                />
                {!commentValid && (
                  <span className="text-red-500 text-sm">
                    At least enter 25 character!
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start">
              <Label className="text-gray-700 text-sm font-semibold text-start">
                Share your best photo
              </Label>
              <div className="flex items-center gap-4">
                {/* Upload Button */}
                <div className="relative border border-dashed border-gray-400 w-24 h-24 rounded-md flex items-center justify-center cursor-pointer bg-gray-100 ">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-600">Upload</span>
                </div>

                {/* Display Uploaded Images */}
                <div className="">
                  <DraggableComponent
                    useScopedState={{ packageId: packageId }}
                    className="flex flex-wrap gap-4"
                  >
                    {scopedState.selectedDraggable.length > 0 &&
                      scopedState.selectedDraggable.map((item) => {
                        const data = item.data as ReviewGalleryParamater; // Type assertion
                        return (
                          <SortableItem
                            key={`${item.id}-${packageId}`}
                            id={item.id}
                          >
                            <ReviewImage
                              id={item.id}
                              src={data.src}
                              packageId={packageId}
                            />
                          </SortableItem>
                        );
                      })}
                  </DraggableComponent>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <StarRating
                defaultValue={totalStar}
                onChange={(value) => {
                  handleUpdatetotalStar(value);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
