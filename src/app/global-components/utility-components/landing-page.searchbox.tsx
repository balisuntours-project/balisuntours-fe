"use client"
import { Input } from "@/components/ui/input";
import api from "@/lib/axios-instance";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function LandingPageSearchBoxUtility({flatPosition} : {flatPosition?: boolean}) {
    const [placeHolders, setPlaceHolders] = useState<Array<string>>([])
    const [currentPlaceholder, setCurrentPlaceholder] = useState<string>("Find Best Attractions");
    const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);

    const getPopularActivityPlaceholder = async() : Promise<void> => {
        try {
            const result = await api.get("/customer/placeholder/latest/activity")
            console.log(result.data)
            setPlaceHolders(result.data.data)
        } catch (error) {
            console.log(error)
        
        }
  }

  useEffect(() => {
    //getPopularActivityPlaceholder()

    const interval = setInterval(() => {
        setPlaceholderIndex((prevIndex) =>
          placeHolders.length > 0 ? (prevIndex + 1) % placeHolders.length : 0
        );
      }, 5000);
  
      return () => clearInterval(interval); // Cleanup interval on unmount
  }, [placeHolders])

   // Update the current placeholder based on the placeholderIndex
   useEffect(() => {
    if (placeHolders.length > 0) {
      setCurrentPlaceholder(placeHolders[placeholderIndex]);
    }
  }, [placeholderIndex, placeHolders]);

    return (
        <>
          <div className={`${flatPosition ? 'mx-auto w-[100%]' : 'absolute top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/4 lg:-translate-y-1/2'} md:w-[100%] bg-opacity-90 text-center p-6 z-10`}>
          {!flatPosition &&  <h2 className="text-2xl md:text-5xl font-semibold text-white">Sleep Doesn’t Help If Your Soul That’s Tired,</h2>}
          {!flatPosition && <p className="text-lg md:text-xl text-white mt-3">Let’s Book Tours and Activities.</p>}
        {/* Input with Search Icon and Button */}
        <div className="relative mt-6  md:w-[70%] lg:w-[40%] mx-auto ">
          {/* Search Icon */}
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <SearchIcon size={20} />
          </div>

          {/* Input Field */}
          <Input
            type="text"
            placeholder={currentPlaceholder}
            className="pl-10 pr-20 w-full bg-white h-12 rounded-lg text-xs md:text-sm"
          />

          {/* Search Button */}
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#008000] text-white px-4 py-2 rounded-lg  font-semibold text-xs md:text-sm">
            Search
          </button>
        </div>
      </div>
        </>
    )
}