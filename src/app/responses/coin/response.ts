import {
  CoinHistoryFlterEnum,
  CoinRoundingTypeEnum,
} from "@/app/enums/coin/coin.enum";

export interface CoinConfigurationResponse {
  coin_earned_percentage: number;
  coin_earned_rounding: CoinRoundingTypeEnum;
  coin_conversion_rate_from_booking: number;
  coin_conversion_rate_from_affiliate: number;
  maximum_applied_discount_percentage: number;
}

export interface UserCoinBalanceResponse {
  uuid: string;
  balance: number;
}

export interface CoinHistoryTransactionResponse {
  uuid: string;
  amount: number;
  coin_convertion: string;
  status: string;
  category_status: CoinHistoryFlterEnum;
  log_text: string;
  description: string | null;
  booking_id: string | null;
  created_at: string;
}

