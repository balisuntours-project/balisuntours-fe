import { EmptyContent } from "@/app/global-components/utility-components/empty-content.page";
import { Car } from "lucide-react";
import Link from "next/link";

export function UnconfirmedEmptyContent () {
    return (
        <>
        <div className="md:col-span-3">
                <EmptyContent
                  emptyText="Seems your booking history empty!"
                  suggestionElement={
                    <p>
                      {" "}
                      You have no booking history yet.{" "}
                      <Link
                        href="/customer/activities"
                        className="text-blue-600"
                      >
                        Lets book an attractions and release your stress 🚜.
                      </Link>
                    </p>
                  }
                >
                  <Car className="w-full h-full" />
                </EmptyContent>
              </div>
        </>
    )
}