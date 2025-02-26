import { TransferTypeEnum } from "@/app/enums/airport-transfer/airport-transfer.enum";

export interface GetVechileRecomendationsParamater {
  transfer_type: TransferTypeEnum;
  origin: string;
  destination: string;
  total_passanger: number;
  transfer_date_time: string;
  administrative_area_level_3: null | string;
  administrative_area_level_4: null | string;
}
