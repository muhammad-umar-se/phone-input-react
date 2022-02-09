export interface PhoneInputProps {
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;
  defaultFlag?: string;
  startingSymbol?: string;
  className?: string;
}

export interface Country {
  countryName: string;
  countryCallingCode: string;
  countryCode: string;
}
