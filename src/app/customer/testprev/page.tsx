"use client"

import { ActivityAction } from "@/app/actions/activity/action";
import { useEffect } from "react";

export default function PageTest() {
    const handleFetch = async() => {
        const data = await ActivityAction.GetPreviewDetailActivity("private-car-rental-with-chauffeur");
        console.log(data)
    }

    useEffect(() => {
        handleFetch()
    }, [])
    return (
        <>
        
        </>
    )
}