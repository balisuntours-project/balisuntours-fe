
import { notFound } from "next/navigation";
import { TransactionStatusContent } from "./components/transaction-status.content";
import { BookingServerAction } from "@/app/actions/booking/action.server";

export default async function ActivityTransactionStatus({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let data = null;
  const orderIdParam = (await searchParams)?.booking_id;
  if (orderIdParam) {
    const result = await BookingServerAction.GetTransactionStatus(
      orderIdParam as string
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
