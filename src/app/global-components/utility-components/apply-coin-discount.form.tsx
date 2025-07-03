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

export function ApplyCoinDiscountForm({
  coinAmount,
  coinConfig,
}: {
  coinAmount: number;
  coinConfig: CoinConfigurationResponse | undefined;
}) {
  const { toast } = useToast();

  const checkoutAmount = useBookingStore((state) => state.checkoutAmount);

  const addedCoinAmount = useCoinStore((state) => state.addedCoinAmount);
  const setAddedCoinAmount = useCoinStore((state) => state.setAddedCoinAmount);
  const setCoinDiscountAmount = useCoinStore(
    (state) => state.setCoinDiscountAmount
  );

  const handleButtonMax = () => {
    if (coinConfig != undefined) {
      const maxAllowedDiscount =
        (checkoutAmount * coinConfig.maximum_applied_discount_percentage) / 100;

      const getCoinDivideAmount = Math.ceil(
        maxAllowedDiscount / coinConfig.coin_conversion_rate_from_booking
      );
      let discountAmount =
        getCoinDivideAmount * coinConfig.coin_conversion_rate_from_booking;

      if (getCoinDivideAmount > coinAmount) {
        setAddedCoinAmount(String(coinAmount));
        discountAmount =
          coinAmount * coinConfig.coin_conversion_rate_from_booking;
        setCoinDiscountAmount(discountAmount);
      } else {
        setAddedCoinAmount(String(getCoinDivideAmount));
        setCoinDiscountAmount(discountAmount);
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
      const coin = Number(value) > coinAmount ? String(coinAmount) : value;
     
      const maxAllowedDiscount =
        (checkoutAmount * coinConfig.maximum_applied_discount_percentage) / 100;

      const getCoinDivideAmount = Math.ceil(
        maxAllowedDiscount / coinConfig.coin_conversion_rate_from_booking
      );

      const usedCoinAmount =
        Number(coin) > getCoinDivideAmount ? getCoinDivideAmount : Number(coin);

      setCoinDiscountAmount(
        usedCoinAmount * coinConfig.coin_conversion_rate_from_booking
      );
      setAddedCoinAmount(usedCoinAmount > 0 ? String(usedCoinAmount) : "");
    }else {
        window.alert(1000)
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <span className="text-sm text-yellow-700">
          You have{" "}
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1">
            {coinAmount} Coins
          </Badge>{" "}
          available to use.
        </span>
        <div className="flex gap-2">
          <Input
            value={addedCoinAmount}
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
            disabled={!coinConfig || coinAmount === 0}
          >
            Max
          </Button>
        </div>
      </div>
    </>
  );
}
