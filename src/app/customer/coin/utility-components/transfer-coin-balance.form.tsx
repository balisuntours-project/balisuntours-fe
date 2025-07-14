"use client";

import { CoinAction } from "@/app/actions/coin/action";
import AnimatedNumber from "@/app/global-components/utility-components/animated-number.framer";
import { ConfirmationDialog } from "@/app/global-components/utility-components/confirmation.dialog";
import { TextLoader } from "@/app/global-components/utility-components/text-loader.popup";
import { useCoinStore } from "@/app/store/coin.store";
import { useLoaderStore } from "@/app/store/loader.store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GlobalUtility } from "@/lib/global.utility";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // cleanup jika user masih mengetik
  }, [value, delay]);

  return debouncedValue;
}

export function TransferCoinBalanceForm({
  coinBalance,
}: {
  coinBalance: number;
}) {
  const { toast } = useToast();
  const [receiverEmail, setReceiverEmail] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isEmailFound, setIsEmailFound] = useState<boolean | undefined>(
    undefined
  );
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const debouncedEmail = useDebouncedValue(receiverEmail, 500);
  const setForceCloseDialog = useLoaderStore(
    (state) => state.setForceCloseDialog
  );

  const setIsLoading = useLoaderStore((state) => state.setIsLoading);
  const setOnTransferCoin = useCoinStore((state) => state.setOnTransferCoin);
  const setAmountOnTransferCoin = useCoinStore((state) => state.setAmountOnTransferCoin);

  const handleChangeEmail = (value: string) => {
    setIsChecking(true);
    setReceiverEmail(value);

    if (value.length == 0) {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    const checkEmailAvailability = async () => {
      if (!debouncedEmail) return;
      setIsChecking(true);
      const result = await CoinAction.FindUserBeforeTransferCoin(
        debouncedEmail
      );
     
      setIsChecking(false);
      if (result.success) {
        setIsEmailFound(true);
      } else {
        setIsEmailFound(false);
      }
    };

    checkEmailAvailability();
  }, [debouncedEmail]);

  const handleTransferCoin = async () => {
    setIsLoading(true);
    const result = await CoinAction.TransferCoin({
      receiver_email: receiverEmail,
      amount: Number(coinAmount),
      ...(description ? { description: description } : {}),
    });
    setIsLoading(false);
    if (result.success) {
       setAmountOnTransferCoin(Number(coinAmount))
      setForceCloseDialog(true);
      setOnTransferCoin(true);
      toast({
        description: `Coin transfer successfully`,
        variant: "success",
      });

      return;
    }

    toast({
      description: `${result.data}`,
      variant: "danger",
    });
  };

  return (
    <>
      <TextLoader title="Hold a second" text="Transfering your coin..." />
      <div className="flex flex-col gap-4">
        <span className="text-sm text-yellow-700">
          You have{" "}
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1">
            <AnimatedNumber
              value={coinBalance}
              formatFn={(val) => GlobalUtility.FormatBeautifyCoin(val)}
              duration={0.5}
            />
            <span className="pl-1">Coins</span>
          </Badge>{" "}
          balance.
        </span>
        <div className="flex flex-col gap-4">
          <div>
            <div className="relative">
              <Input
                value={receiverEmail}
                onChange={(e) => handleChangeEmail(e.target.value)}
                id="user-email"
                type="email"
                placeholder="Receiver email"
                className="px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              />

              {isChecking && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            {!isChecking && receiverEmail.length > 0 && !isEmailFound && (
              <p className="text-red-600 text-sm mt-1">Receiver not found!</p>
            )}
          </div>
          <div className="flex gap-2">
            <Input
              value={coinAmount}
              onChange={(e) =>
                setCoinAmount(
                  Number(e.target.value) > coinBalance
                    ? String(coinBalance)
                    : e.target.value
                )
              }
              id="coin-amount"
              type="number"
              placeholder="Amount to transfer"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <Button
              variant="default"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
              type="button"
              onClick={() => setCoinAmount(String(coinBalance))}
              disabled={coinBalance < 1}
            >
              Max
            </Button>
          </div>
          <div>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short note for the recipient (Optional)"
              className="min-h-[50px]"
            />
          </div>
          {isEmailFound ? (
            <div className="w-full max-w-full md:max-w-[200px] mx-auto ">
              <ConfirmationDialog
                dialogTitle="Continue transfer?"
                dialogDescription="You can't undo this action later"
                onClick={() => handleTransferCoin()}
              >
                <Button
                  variant="outline"
                  className="bg-[#008000] w-full max-w-full md:max-w-[200px] mx-auto  hover:bg-[#008000] hover:opacity-90 text-white hover:text-white"
                >
                  <Wallet /> Transfer Coins
                </Button>
              </ConfirmationDialog>
            </div>
          ) : (
            <Button
              variant="outline"
              disabled
              className="bg-[#008000] w-full cursor-not-allowed max-w-full md:max-w-[200px] mx-auto  hover:bg-[#008000] hover:opacity-90 text-white hover:text-white"
            >
              <Wallet /> Transfer Coins
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
