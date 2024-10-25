export type TCountryCodes = ICountryCode[];

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
