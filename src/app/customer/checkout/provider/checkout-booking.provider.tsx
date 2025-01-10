import { createContext, useContext, useRef } from "react";

interface CheckoutRefs {
  mapLocationRef: React.RefObject<HTMLParagraphElement>;
  planningItineraryRef: React.RefObject<HTMLParagraphElement>;
  pickupTimeRef: React.RefObject<HTMLParagraphElement>;
  freeTourServiceRef: React.RefObject<HTMLParagraphElement>;
}
const CheckoutBookingContext = createContext<CheckoutRefs | null>(null);

export function CheckoutBookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapLocationRef = useRef<HTMLParagraphElement>(null);
  const planningItineraryRef = useRef<HTMLParagraphElement>(null);
  const pickupTimeRef = useRef<HTMLParagraphElement>(null);
  const freeTourServiceRef = useRef<HTMLParagraphElement>(null);

  const refs = {mapLocationRef, planningItineraryRef, pickupTimeRef, freeTourServiceRef}
  return (
    <CheckoutBookingContext.Provider value={refs}>
      {children}
    </CheckoutBookingContext.Provider>
  );
}

export function useCheckoutBookingProvider() {
  const context = useContext(CheckoutBookingContext);
  if (!context) {
    throw new Error(
      "useActivityDate must be used within an ActivityDateProvider"
    );
  }
  return context;
}
