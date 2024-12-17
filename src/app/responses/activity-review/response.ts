import { FileResponse } from "../file/response";
import { UserResponse } from "../user/response";

export interface ActivityReviewResponse {
  //activity_id: number,
  id: number;
  comment: string | null;
  fake_profile: string | null;
  name: string;
  total_star: number;
  review_galleries: Array<ReviewGalleryResponse>;
  created_at: string;
  user: UserResponse
}

interface ReviewGalleryResponse {
  //activity_review_id: number,
  uuid: string;
  order: number;
  title: null | string;
  files: FileResponse;
}
