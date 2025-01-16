export interface ActivityMetaDataResponse {
    uuid: string,
    meta_title: string,
    meta_description: string|null,
    og_title: string|null,
    og_description: string|null,
    og_image: string|null,
    canonical_url: string,
    slug: string,
}