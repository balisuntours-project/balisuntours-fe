import { AirportTransferActionServer } from "@/app/actions/airport-transfer/action.server";
import { notFound } from "next/navigation";
import { TransactionStatusContent } from "./components/transaction-status.content";

export default async function AirportTransferTransactionStatus({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let data = null;
  const bookingIdParam = (await searchParams)?.booking_id;
  if (bookingIdParam) {
    const result = await AirportTransferActionServer.GetTransactionStatus(
      bookingIdParam as string
    );

    if (!result.success) {
      notFound();
    }

    data = result.data;
  } else {
    notFound();
  }
  return <TransactionStatusContent data={data} />;
}
