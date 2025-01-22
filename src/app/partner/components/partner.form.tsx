"use client"

import { ActivityTitleCard } from "@/app/global-components/utility-components/activity-title.card"
import { PartnerForm } from "../utility-component/form"
import Image from "next/image"
import Link from "next/link"

export function PartnerFormSection() {
    return (
        <>
            <div className="bg-white text-gray-900 flex justify-center">
                <div className="flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-7/12 p-6 sm:p-12 md:my-auto">
                        <div className="mx-auto max-w-[448px]">
                            <Link href="/" className="flex justify-center mb-6 md:mb-12">
                                <Image
                                    src="/bst-logo-dark-green.png"
                                    alt="best-travell-agent-bali-sun-tours"
                                    width="135"
                                    height="58"
                                    objectFit="cover"
                                    className="w-[200px] h-[45px] md:w-[200px] md:h-[45px]"
                                />
                            </Link>

                            <div className="mx-auto text-center">
                                <ActivityTitleCard customSizeText="text-lg md:text-xl" textColor="text-[#008000]" title="Join Us!" />
                                <p className="text-center mb-3">
                                    And leverage your company income!
                                </p>
                            </div>

                            <PartnerForm />
                        </div>
                    </div>
                    <div className="flex-1 bg-gray-100 text-center hidden md:flex">
                        <div className="flex flex-col justify-center items-center w-full h-full p-8">
                            <h2 className="text-2xl font-bold text-[#008000] mb-4">Become Our Partner!</h2>
                            <p className="text-lg text-gray-800">Sell your tours and activities with us and grow together.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
