import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SpecialOfferPackage = () => {
  return (
    <section className="mt-6 md:mt-11 border border-yellow-500 bg-yellow-50 rounded-xl shadow-sm p-5">
      <div className="max-w-full space-y-3">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          🪙 Earn Bali SUN Coins Every Time You Book!
        </h2>
        <p className="text-sm sm:text-base font-medium max-w-full">
          As a valued guest, you’ll automatically earn{" "}
          <strong>🪙 Bali SUN coins</strong> from every booking. Use your coins
          to get discounts on your next trip or unlock exclusive benefits.
        </p>

        <p className="text-sm sm:text-base font-medium max-w-full">
          The more you book, the more you earn. It's our way of saying{" "}
          <strong>thank you</strong> for choosing us! 🎉
        </p>

        <div className="mt-4 md:mt-6">
          <h3 className="text-lg md:text-xl font-semibold md:mb-2">
            What Can You Do with Bali SUN Coins?
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                💸 Use for Discounts on Future Bookings
              </AccordionTrigger>
              <AccordionContent>
                Redeem your Bali SUN Coins to get instant discounts on your next
                activity booking the more you collect, the more you save.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                🎁 Transfer Coins with Friends
              </AccordionTrigger>
              <AccordionContent>
                You can transfer your Bali SUN Coins to a friend’s account or
                receive coins from theirs! Combine your coins to unlock bigger
                discounts on group bookings or future adventures together.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                💰 Convert to Real Money (Coming Soon)
              </AccordionTrigger>
              <AccordionContent>
                You’ll soon be able to convert your Bali SUN Coins into real
                money with a good exchange rate! This exciting feature is coming
                soon, stay tuned and keep collecting!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
