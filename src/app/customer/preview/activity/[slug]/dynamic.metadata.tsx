import { DetailActivityParamater } from "@/app/paramaters/activity/paramater";
import api from "@/lib/axios-instance";
import { Metadata } from "next";

export async function generateMetadata({
    params,
  }: {params: Promise<DetailActivityParamater>}): Promise<Metadata> {
    const slug = (await params).slug
  
    // Fetch product data from API
    const product = await api.get("/customer/test-meta");
   
    return {
      title: product.data.title,
      description: product.data.description,
      openGraph: {
        title: product.data.title,
        description: product.data.description,
        images: [...product.data.images],
      },
      twitter: {
        card: "summary_large_image",
        title: product.data.title,
        description: product.data.description,
        images: [...product.data.images],
      },
    };
  }
  