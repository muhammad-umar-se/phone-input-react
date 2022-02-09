export interface PhoneInputProps {
  phoneNumber: string;
  setPhoneNumber: (v: string|number) => void;
  defaultFlag?: string;
  startingSymbol?: string;
  className?: string;
}

export interface Country {
  countryName: string;
  countryCallingCode: string;
  countryCode: string;
}
