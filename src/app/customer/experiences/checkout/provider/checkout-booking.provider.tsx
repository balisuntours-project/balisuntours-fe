import { createContext, useContext, useRef } from "react";

interface CheckoutRefs {
  mapLocationRef: React.RefObject<HTMLParagraphElement>;
  planningItineraryRef: React.RefObject<HTMLParagraphElement>;
  pickupTimeRef: React.RefObject<HTMLParagraphElement>;
  freeTourServiceRef: React.RefObject<HTMLParagraphElement>;
  textAreaPlannedPlaceRef: React.RefObject<HTMLTextAreaElement>;
  textAreaNoteRef: React.RefObject<HTMLTextAreaElement>;
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

  const textAreaPlannedPlaceRef = useRef<HTMLTextAreaElement>(null);
  const textAreaNoteRef = useRef<HTMLTextAreaElement>(null);

  const refs = {mapLocationRef, planningItineraryRef, pickupTimeRef, freeTourServiceRef, textAreaPlannedPlaceRef, textAreaNoteRef}
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
