export const phoneNoReg = /^[0-9\b]+$/;
export const flagURL = "https://flagpedia.net/data/flags/h80/";
export const removeSpace = /\s/g;

export const flagUrl = (countryCode: string) => {
  return flagURL + `${countryCode}.webp`;
};
