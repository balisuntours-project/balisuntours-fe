export type BaseButtonProps = {
    title: string,
    rouded? : string
}

export type CookieResponseType = {
    access_token: CookieValueResponseType,
    refresh_token: CookieValueResponseType,
    "google-login": CookieValueResponseType,
}

export type CookieValidateJwtResponseType = Omit<CookieResponseType, "google-login">

export type CookieValueResponseType = {
    value: string,
    ttl: number,
    http_only?: boolean,
    secure?: boolean
}