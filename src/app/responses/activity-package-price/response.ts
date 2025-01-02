export interface ActivityPackagePriceResponse {
  id: number;
  uuid: string;
  //activity_package_id: string,
  title: string;
  price_information: string | null;
  order_position: string;
  is_mandatory: string;
  minimum_qty: number;
  maximum_qty: number;
  price: number;
}

export interface CartPriceResponse
  extends Pick<
    ActivityPackagePriceResponse,
    "maximum_qty" | "minimum_qty" | "price" | "title" | "uuid"
  > {
  cart_uuid: string;
  qty: number;
}

export interface BookingPriceResponse extends Pick<ActivityPackagePriceResponse, "price" | "price_information" | "title"> {
    qty: number
}

export interface CheckoutActivityPackagePriceResponse {
    activity_date: string,
    maximum_qty:number,
    minimum_qty: number,
    qty: number,
    price: number,
    total_price: number,
    title: string,

}