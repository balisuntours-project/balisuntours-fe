export interface AddReviewParamater {
   order_id: string,
   reviews: {
    [key: string]: ReviewDataParamater;
  };
}

export interface ReviewDataParamater {
    activity_uuid: string,
    name: string,
    comment: string,
    total_star: number,
    review_galleries: {
        [key: string|number] : Omit<ReviewGalleryParamater, 'src'>
    },
}

export interface ReviewGalleryParamater {
    src: string,
    file: File,
    title?: string,
}

