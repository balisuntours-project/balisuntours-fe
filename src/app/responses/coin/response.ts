import { CoinRoundingTypeEnum } from "@/app/enums/coin/coin.enum";

export interface CoinConfigurationResponse {
  coin_earned_percentage: number;
  coin_earned_rounding: CoinRoundingTypeEnum;
  coin_conversion_rate_from_booking: number;
  coin_conversion_rate_from_affiliate: number;
  maximum_applied_discount_percentage: number;
}

export interface UserCoinBalanceResponse {
    uuid: string,
    balance: number
}