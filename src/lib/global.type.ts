export type BaseButtonProps = {
  title: string;
  rouded?: string;
};

export type CookieResponseType = {
  access_token: CookieValueResponseType;
  refresh_token: CookieValueResponseType;
  session_token: CookieValueResponseType;
  "google-login": CookieValueResponseType;
};

export type CookieValidateJwtResponseType = CookieResponseType

export type CookieValueResponseType = {
  value: string;
  ttl: number;
  http_only?: boolean;
  secure?: boolean;
  name?: string;
};

export type ButtonActionProps = {
  onClick?: () => void;
  onClickCancel?: () => void;
};


