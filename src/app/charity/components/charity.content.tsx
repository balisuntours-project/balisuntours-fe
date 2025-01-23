import { CharityContentData } from "../content";
import { CharityCard } from "../utility-components/charity.card";

export function CharityContent() {
    return (
        <>
           <div className="">
           <h1 className="text-xl md:text-3xl font-bold">Spread love with others❤️</h1>
           <div className="grid grid-cols-12 gap-3 pt-5">
            {CharityContentData.map((data, index) => (
                <div  key={index} className="p-1 col-span-12 md:col-span-6 lg:col-span-4">
                    <CharityCard data={data} />
                </div>
            ))}
            </div>
           </div>
        </>
    )
}