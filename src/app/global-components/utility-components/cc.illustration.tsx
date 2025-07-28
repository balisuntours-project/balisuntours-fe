import Image from "next/image";

export function CCIllustration({name} : {name: string}) {
  return (
    <>
      <div className="credit-card mt-8 mb-6 mx-auto w-full max-w-xs p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 ease-in-out bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h4 className="text-white font-bold text-lg">Credit Card</h4>
          <div className="w-12 h-8 bg-white rounded-sm flex items-center justify-center shadow-md">
            <Image
              src="/bst-logo.png"
              alt="Company Logo"
              width={25}
              height={25}
              className="w-11"
            />
          </div>
        </div>
        <p className="text-white text-left tracking-wider mb-4">
          **** **** **** 1234
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white text-xs uppercase">Card Holder</p>
            <p className="text-white font-semibold">{name}</p>
          </div>
          <div>
            <p className="text-white text-xs uppercase">Valid Thru</p>
            <p className="text-white font-semibold">--/--</p>
          </div>
        </div>
      </div>
    </>
  );
}
