import { ActivityAction } from "@/app/actions/activity/action";
import { DetailActivityParamater } from "@/app/paramaters/activity/paramater";
import { api }from "@/lib/axios-instance";
import { Metadata } from "next";

export async function generateMetadata({
    params,
  }: {params: Promise<DetailActivityParamater>}): Promise<Metadata> {
    const slug = (await params).slug
  
    // Fetch product data from API
    const response = await ActivityAction.GetPreviewActivityMetadata()
   
    const product = response.data
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [...product.images],
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description,
        images: [...product.images],
      },
    };
  }
  