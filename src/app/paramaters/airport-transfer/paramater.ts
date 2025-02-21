import { TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";

export interface GetVechileRecomendationsParamater {
  transfer_type: TransferTypeEnum;
  origin: null|string;
  destination: null|string;
  total_passanger: number;
  transfer_date_time: string|Date;
  origin_coordinate: null | string;
  destination_coordinate: null | string;
  administrative_area_level_3: null | string;
  administrative_area_level_4: null | string;
}
