import { TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";
import { VechileRecomendationResponse } from "@/app/responses/airport-transfer/response";

export interface GetVechileRecomendationsParamater {
  transfer_type: TransferTypeEnum;
  origin: string;
  destination: string;
  origin_coordinate: string,
  destination_coordinate: string,
  origin_place_id?: string,
  destination_place_id?: string,
  total_passanger: number;
  transfer_date_time: string;
  administrative_area_level_3: null | string;
  administrative_area_level_4: null | string;
}

export interface RangeVechilePrice {
  lowest: number,
  highest: number
}


export interface SelectedCarParamater extends VechileRecomendationResponse {
  qty: number
}
