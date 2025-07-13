import { createContext, useContext, useRef } from "react";

interface ActivityRefs {
  activityDateRef: React.RefObject<HTMLParagraphElement>;
  priceQtyEmptyRef: React.RefObject<HTMLDivElement>;
}
const ActivityDateContext = createContext<ActivityRefs | null>(null);

export function ActivityDateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activityDateRef = useRef<HTMLParagraphElement>(null);
  const priceQtyEmptyRef = useRef<HTMLParagraphElement>(null);

  const refs = {activityDateRef, priceQtyEmptyRef}
  return (
    <ActivityDateContext.Provider value={refs}>
      {children}
    </ActivityDateContext.Provider>
  );
}

export function useActivityDate() {
  const context = useContext(ActivityDateContext);
  if (!context) {
    throw new Error(
      "useActivityDate must be used within an ActivityDateProvider"
    );
  }
  return context;
}
