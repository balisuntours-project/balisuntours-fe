import { AirportTransferActionServer } from "@/app/actions/airport-transfer/action.server";
import { notFound } from "next/navigation";
import { TransactionStatusContent } from "./components/transaction-status.content";
import { NotFoundTransactionStatusContent } from "./components/not-found-transaction.content";

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

    // if (!result.success) {
    //   notFound();
    // }

    if (result.success) {
      data = result.data;
    }
  } else {
    notFound();
  }
  return (
    <>
      {data ? (
        <TransactionStatusContent data={data} />
      ) : (
        <NotFoundTransactionStatusContent bookingId={bookingIdParam as string} />
      )}
    </>
  );
}
