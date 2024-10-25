export type TCountryCodes = Array<ICountryCode>;

export interface ICountryCode {
  name: string;
  flag: string;
  code: string;
  dial_code: string;
  img?: string;
}

export interface ISocials {
  code: number;
  name: string;
}

export interface ICreateResponse {
  session_id: string;
  session_expired_at: string;
  sent_to: string;
  channels: IChannel[];
}

export interface ISendResponse {
  session_id: string;
  session_expired_at: string;
  channel: IChannel;
}

export interface IChannel {
  name: string;
  type: string;
  is_active: boolean;
  timeout: number;
  description: string;
  image_url: string;
  link: string;
}

export interface ICheckResponse {
  verify_token: string;
  is_test: boolean;
}
