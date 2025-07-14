import { CoinHistoryFlterEnum } from "@/app/enums/coin/coin.enum";

export interface CoinHistoryTransactionParamater {
  id: number;
  type: CoinHistoryFlterEnum
  description: string;
  amount: number;
  date: string;
}


export interface TransferCoinParamater {
  receiver_email: string,
  amount: number,
  description?: string
}