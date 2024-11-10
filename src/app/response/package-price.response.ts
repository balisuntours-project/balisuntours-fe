

export interface PackagePrice {
    uuid: string,
    //activity_package_id: string,
    title: string,
    price_information: string|null,
    order_position: string,
    is_mandatory: string,
    minimum_qty: number,
    maximum_qty: number,
    price: number,
}