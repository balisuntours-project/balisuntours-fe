import { IncrementDecrementEnum } from "@/app/enum/activity.enum";
import {
  CalculateTotalPriceParamater,
  PriceListsParamater,
} from "@/app/paramaters/activity/paramater";

export class ActivityUtility {
  static CalculateTotalPrice(
    calculateParam: CalculateTotalPriceParamater
  ): number {
    const newPrice = calculateParam.price * calculateParam.new_qty;

    if (calculateParam.action == IncrementDecrementEnum.increment) {
      calculateParam.current_total_price += newPrice;
    } else if (calculateParam.action == IncrementDecrementEnum.decrement) {
      calculateParam.current_total_price -= newPrice;
    }

    return calculateParam.current_total_price;
  }
}