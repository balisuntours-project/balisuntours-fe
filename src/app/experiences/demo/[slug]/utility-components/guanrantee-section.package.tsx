import { ShieldCheck } from "lucide-react"; // lucide icon: shield with check

export const GuaranteeSection = () => {
  const guarantees = [
    "100% Money-Back Guarantee",
    "Weather Refund Guarantee",
    "Free Rescheduling (24 hrs notice)",
    "Fully Insured",
    "Friendly English-Speaking Guides",
  ];

  return (
    <section className="mt-6 md:mt-11 border border-emerald-500 bg-emerald-50 rounded-xl shadow-sm p-5">
      <div className="max-w-full space-y-3">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
          🛡️ Worry-Free Booking
        </h2>

        <div className="grid sm:grid-cols-2 gap-2 text-left max-w-full">
          {guarantees.map((item, index) => (
            <div key={index} className="flex items-start gap-3 px-2 py-2 md:py-4 rounded-lg shadow-sm">
              <ShieldCheck className="text-[#EB5E00] w-6 h-6 shrink-0" />
              <span className="text-base md:text-lg text-emerald-900">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
