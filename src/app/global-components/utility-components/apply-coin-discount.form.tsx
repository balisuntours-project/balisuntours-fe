"use client";

import { CoinAction } from "@/app/actions/coin/action";
import { CoinConfigurationResponse } from "@/app/responses/coin/response";
import { useBookingStore } from "@/app/store/booking.store";
import { useCoinStore } from "@/app/store/coin.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import AnimatedNumber from "./animated-number.framer";
import { GlobalUtility } from "@/lib/global.utility";

export function ApplyCoinDiscountForm({
  coinAmount,
  coinConfig,
  unconfirmedBookingUuid,
}: {
  coinAmount: number;
  coinConfig: CoinConfigurationResponse | undefined;
  unconfirmedBookingUuid?: string;
}) {
  const { toast } = useToast();

  const checkoutAmount = useBookingStore((state) => state.checkoutAmount);

  const addedCoinAmount = useCoinStore((state) => state.addedCoinAmount);
  const setAddedCoinAmount = useCoinStore((state) => state.setAddedCoinAmount);
  const setCoinDiscountAmount = useCoinStore(
    (state) => state.setCoinDiscountAmount
  );

  const setUnconfirmedBookingDiscount = useBookingStore(
    (state) => state.setUnconfirmedBookingDiscount
  );
  const unconfirmedBookingDiscount = useBookingStore(
    (state) => state.unconfirmedBookingDiscount
  );

  const [cleanCoinBalance, setCleanCoinBalance] = useState(0);

  useEffect(() => {
    if (unconfirmedBookingUuid) {
      //get clean coin balance
      let calculateCoin = coinAmount;
      Object.entries(unconfirmedBookingDiscount).forEach(([uuid, data]) => {
        if (uuid !== unconfirmedBookingUuid) {
          calculateCoin -= Number(data.added_coin);
        }
      });

      setCleanCoinBalance(calculateCoin);
    }
  }, [unconfirmedBookingUuid]);

  const handleButtonMax = () => {
    if (coinConfig != undefined) {
      if (!unconfirmedBookingUuid) {
        const maxAllowedDiscount =
          (checkoutAmount * coinConfig.maximum_applied_discount_percentage) /
          100;

        const getCoinDivideAmount = Math.ceil(
          maxAllowedDiscount / coinConfig.coin_conversion_rate_from_booking
        );
        let discountAmount = maxAllowedDiscount;

        if (getCoinDivideAmount > coinAmount) {
          setAddedCoinAmount(String(coinAmount));
          discountAmount =
            coinAmount * coinConfig.coin_conversion_rate_from_booking;
          setCoinDiscountAmount(discountAmount);
        } else {
          setAddedCoinAmount(String(getCoinDivideAmount));
          setCoinDiscountAmount(discountAmount);
        }
      }

      if (unconfirmedBookingUuid) {
        const maxAllowedDiscount =
          (unconfirmedBookingDiscount[unconfirmedBookingUuid].amount *
            coinConfig.maximum_applied_discount_percentage) /
          100;

        let getCoinDivideAmount = Math.ceil(
          maxAllowedDiscount / coinConfig.coin_conversion_rate_from_booking
        );
        let discountAmount = maxAllowedDiscount;

        if (getCoinDivideAmount > cleanCoinBalance) {
          getCoinDivideAmount = cleanCoinBalance;
          discountAmount =
            cleanCoinBalance * coinConfig.coin_conversion_rate_from_booking;
        }

        setUnconfirmedBookingDiscount((prevItems) => ({
          ...prevItems,
          [unconfirmedBookingUuid]: {
            discount_amount: discountAmount,
            added_coin: String(getCoinDivideAmount),
            amount: prevItems[unconfirmedBookingUuid].amount,
          },
        }));
      }
    } else {
      toast({
        description: `We can't get your coin data!`,
        variant: "danger",
      });
    }
  };

  const handleCoinAmountChange = (value: string) => {
    if (coinConfig) {
      if (!unconfirmedBookingUuid) {
        const coin = Number(value) > coinAmount ? String(coinAmount) : value;

        const maxAllowedDiscount =
          (checkoutAmount * coinConfig.maximum_applied_discount_percentage) /
          100;

        const getCoinDivideAmount = Math.ceil(
          maxAllowedDiscount / coinConfig.coin_conversion_rate_from_booking
        );

        const usedCoinAmount =
          Number(coin) > getCoinDivideAmount
            ? getCoinDivideAmount
            : Number(coin);

        if (usedCoinAmount < getCoinDivideAmount) {
          setCoinDiscountAmount(
            usedCoinAmount * coinConfig.coin_conversion_rate_from_booking
          );
        } else {
          setCoinDiscountAmount(maxAllowedDiscount);
        }
        setAddedCoinAmount(usedCoinAmount > 0 ? String(usedCoinAmount) : "");
      }

      if (unconfirmedBookingUuid) {
        const coin =
          Number(value) > cleanCoinBalance ? String(cleanCoinBalance) : value;

        const maxAllowedDiscount =
          (unconfirmedBookingDiscount[unconfirmedBookingUuid].amount *
            coinConfig.maximum_applied_discount_percentage) /
          100;

        const getCoinDivideAmount = Math.ceil(
          maxAllowedDiscount / coinConfig.coin_conversion_rate_from_booking
        );

        const usedCoinAmount =
          Number(coin) > getCoinDivideAmount
            ? getCoinDivideAmount
            : Number(coin);

        let discountAmount = maxAllowedDiscount;

        if (usedCoinAmount < getCoinDivideAmount) {
          discountAmount =
            usedCoinAmount * coinConfig.coin_conversion_rate_from_booking;
        }

        setUnconfirmedBookingDiscount((prevItems) => ({
          ...prevItems,
          [unconfirmedBookingUuid]: {
            discount_amount: discountAmount,
            added_coin: usedCoinAmount > 0 ? String(usedCoinAmount) : "",
            amount: prevItems[unconfirmedBookingUuid].amount,
          },
        }));
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="text-sm text-yellow-700">
          You have{" "}
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1">
            <AnimatedNumber
              value={!unconfirmedBookingUuid
              ? coinAmount - Number(addedCoinAmount)
              : cleanCoinBalance -
                Number(
                  unconfirmedBookingDiscount[unconfirmedBookingUuid].added_coin
                )}
              formatFn={(val) => GlobalUtility.FormatBeautifyCoin(val)}
              duration={0.5}
            />
            <span className="pl-1">Coins</span>
          </Badge>{" "}
          available to use.
        </span>
        <div className="flex gap-2">
          <Input
            value={
              !unconfirmedBookingUuid
                ? addedCoinAmount
                : unconfirmedBookingDiscount[unconfirmedBookingUuid].added_coin
            }
            onChange={(e) => handleCoinAmountChange(e.target.value)}
            max={coinAmount}
            min={1}
            id="coin-amount"
            type="number"
            placeholder="Amount to exchane"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
          <Button
            variant="default"
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
            type="button"
            onClick={() => handleButtonMax()}
            disabled={
              !coinConfig ||
              (!unconfirmedBookingUuid
                ? coinAmount === 0
                : cleanCoinBalance === 0)
            }
          >
            Max
          </Button>
        </div>
      </div>
    </>
  );
}
