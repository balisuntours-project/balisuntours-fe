"use client";

import AnimatedNumber from "@/app/global-components/utility-components/animated-number.framer";
import { ApplyCoinDiscountForm } from "@/app/global-components/utility-components/apply-coin-discount.form";
import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { CoinConfigurationResponse } from "@/app/responses/coin/response";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalUtility } from "@/lib/global.utility";
import { Send, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { TransferCoinBalanceForm } from "../utility-components/transfer-coin-balance.form";
import { useCoinStore } from "@/app/store/coin.store";

export function CoinBalanceCard({
  coinBalance,
  coinConfig,
}: {
  coinBalance: number;
  coinConfig: CoinConfigurationResponse;
}) {
  const [coinBalanceState, setCoinBalanceState] = useState(0);
  const [coinConvertion, setCoinConvertion] = useState(0);
  
  const amountOnTransferCoin = useCoinStore((state) => state.amountOnTransferCoin)
  useEffect(() => {
    setTimeout(() => {
      setCoinBalanceState(coinBalance);
      setCoinConvertion(
        coinBalance * coinConfig.coin_conversion_rate_from_booking
      );
    }, 1);
  }, []);

  return (
    <>
      <Card className="mb-6 ">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-yellow-600">
            Your Balisun Coin Balance
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          {/* Coin amount */}
          <p className="text-xl md:text-2xl font-bold text-yellow-500">
            <AnimatedNumber
              value={coinBalanceState - amountOnTransferCoin}
              formatFn={(val) => GlobalUtility.FormatBeautifyCoin(val)}
            />{" "}
            🪙
          </p>

          {/* "=" line */}
          <p className="text-base md:text-xl font-medium text-muted-foreground my-1">
            =
          </p>

          {/* IDR Conversion */}
          <p className="text-2xl md:text-3xl font-extrabold text-green-600">
            <AnimatedNumber
              value={coinConvertion - (amountOnTransferCoin * coinConfig.coin_conversion_rate_from_booking)}
              formatFn={(val) => GlobalUtility.IdrCurrencyFormat(val)}
            />
          </p>

          <div className="pt-3">
            <DynamicDialog
              trigger={
                <Button
                  variant="outline"
                  className="bg-[#008000]  hover:bg-[#008000] hover:opacity-90 text-white hover:text-white"
                >
                  <Wallet /> Transfer Coins
                </Button>
              }
            >
             <TransferCoinBalanceForm coinBalance={coinBalanceState} />
            </DynamicDialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
