import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalUtility } from "@/lib/global.utility";
import { CoinHistoryTransactionResponse } from "@/app/responses/coin/response";
import { CoinHistoryFlterEnum } from "@/app/enums/coin/coin.enum";

export default function CoinHistoryDetail({
  data,
}: {
  data: CoinHistoryTransactionResponse;
}) {
  const createdAtFormatted = GlobalUtility.FormatBeautifullDate(
    data.created_at,
    true
  );

  const getCategoryColor = (category: CoinHistoryFlterEnum) => {
    switch (category) {
      case CoinHistoryFlterEnum.In:
        return "text-green-600";
      case CoinHistoryFlterEnum.Out:
        return "text-red-500";
      case CoinHistoryFlterEnum.Pending:
        return "text-gray-400";
      case CoinHistoryFlterEnum.Reserved:
        return "text-gray-400";
    }
  };

  const getCategoryLabel = (category: CoinHistoryFlterEnum) => {
    switch (category) {
      case CoinHistoryFlterEnum.In:
        return "Incoming";
      case CoinHistoryFlterEnum.Out:
        return "Outgoing";
      case CoinHistoryFlterEnum.Pending:
        return "Pending";
       case CoinHistoryFlterEnum.Reserved:
        return "Reserved";
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Coin Transaction Detail
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">History ID:</span>
          <span className="text-muted-foreground">{data.uuid}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{createdAtFormatted}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Status:</span>
          <Badge
            variant="outline"
            className={getCategoryColor(data.category_status)}
          >
            {getCategoryLabel(data.category_status)}
          </Badge>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span
            className={`font-semibold ${getCategoryColor(
              data.category_status
            )}`}
          >
            {data.category_status === CoinHistoryFlterEnum.Pending && "..."}
            {data.category_status === CoinHistoryFlterEnum.Reserved && "~"}
            {data.amount.toLocaleString()} 🪙
          </span>
        </div>

        {data.coin_convertion !== null && (
          <div className="flex justify-between">
            <span className="font-medium">Conversion:</span>
            <span>
              {GlobalUtility.IdrCurrencyFormat(Number(data.coin_convertion))}
            </span>
          </div>
        )}

        {data.booking_id && (
          <div className="flex justify-between">
            <span className="font-medium">Booking ID:</span>
            <span>{data.booking_id}</span>
          </div>
        )}

        {data.description && (
          <div className="flex justify-between">
            <span className="font-medium">Description:</span>
            <span>{data.description}</span>
          </div>
        )}

        {data.log_text && (
          <div className="flex justify-between flex-wrap">
            <span className="font-medium block mb-1">Action:</span>
            <p className="text-muted-foreground text-start text-sm leading-relaxed">
              {data.log_text}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
