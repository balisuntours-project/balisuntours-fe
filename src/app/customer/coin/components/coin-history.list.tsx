"use client";

import { DynamicDialog } from "@/app/global-components/utility-components/dynamic-content.dialog";
import { CoinHistoryTransactionResponse } from "@/app/responses/coin/response";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlobalUtility } from "@/lib/global.utility";
import CoinHistoryDetail from "../utility-components/coin-history-detail.card";
import { CoinHistoryFlterEnum } from "@/app/enums/coin/coin.enum";

export function CoinHistoryList({
  transactions,
}: {
  transactions: CoinHistoryTransactionResponse[];
}) {
  if (transactions.length === 0) {
    return (
      <p className="text-center text-muted-foreground">
        No transactions found for selected filter.
      </p>
    );
  }

  return (
    <ScrollArea className="h-[300px] pr-3">
      <div className="space-y-3">
        {transactions.map((trx) => (
          <DynamicDialog
            key={trx.uuid}
            useSmallVersion={true}
            trigger={
              <div
                className="flex justify-between items-center border rounded-md p-4 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:bg-gray-50 cursor-pointer
"
              >
                <div className="w-full max-w-[70%]">
                  <p className="font-medium">{trx.status}</p>
                  <p className="text-xs text-muted-foreground">
                    {GlobalUtility.FormatBeautifullDate(trx.created_at, true)}
                  </p>
                </div>
                <div
                  className={`font-bold ${
                    trx.category_status === "in"
                      ? "text-green-600"
                      : trx.category_status === "out"
                      ? "text-red-500"
                      : "text-gray-400"
                  }`}
                >
                  {trx.category_status === CoinHistoryFlterEnum.Pending && "..."}
                  {trx.category_status === CoinHistoryFlterEnum.Reserved && "~"}
                  {trx.amount.toLocaleString()} 🪙
                </div>
              </div>
            }
          >
            <CoinHistoryDetail data={trx} />
          </DynamicDialog>
        ))}
      </div>
    </ScrollArea>
  );
}
