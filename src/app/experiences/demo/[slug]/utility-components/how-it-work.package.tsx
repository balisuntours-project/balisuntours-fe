export function HowItWorkPackage() {
  const steps = [
    { icon: "📱", text: "Book Online" },
    { icon: "🚐", text: "Hotel Pickup" },
    { icon: "👣", text: "Easy Walk to River" },
    { icon: "🦺", text: "Safety Briefing + Gear" },
    { icon: "🛶", text: "2-Hour Rafting" },
    { icon: "🍱", text: "Lunch + Hotel Drop-Off" },
  ];
  return (
    <>
      <section className="mt-6 md:mt-11 ">
        <div className="max-w-full">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold">
            How it Works?
          </h2>
          <div className="grid mt-4 sm:grid-cols-2 gap-2 text-left">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-background px-2 py-2 md:py-4 rounded-lg shadow-sm"
              >
                <div className="text-xl md:text-2xl">{step.icon}</div>
                <div className="text-base sm:text-lg font-medium">
                  {index + 1}. {step.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
