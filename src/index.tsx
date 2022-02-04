import { useEffect, useState } from "react";
import { formatIncompletePhoneNumber } from "libphonenumber-js";

import { Country, Input } from "./types/interfaces";
import { flagURL, phoneNoReg } from "./constants";
import { countryDetails } from "./CountryDetails";
import React from "react";

export const PhoneInput = (input: Input): JSX.Element => {
  const { phoneNumber, setPhoneNumber } = input;
  const [displayList, setDisplayList] = useState(false);
  const [flag, setFlag] = useState("");
  const [isFlagSelected, setIsFlagSelected] = useState(false);

  useEffect(() => {
    const length = phoneNumber.length;

    if (!length) setFlag(flagURL + `us.webp`);
  }, [phoneNumber]);

  useEffect(() => {
    const callingCode = "+" + phoneNumber.replace(/\s/g, "");

    const phoneNumberParsed = formatIncompletePhoneNumber(callingCode);
    const getCountryCode = phoneNumberParsed.split(" ");
    const findFlag = countryDetails.find(
      (item: Country) =>
        item?.countryCallingCode ===
        (isFlagSelected ? callingCode : getCountryCode[0])
    );
    if (findFlag) {
      setFlag(flagURL + `${findFlag?.countryCode}.webp`);
      setDisplayList(false);
    }
    //setIsFlagSelected(false);
  }, [phoneNumber, isFlagSelected]);
  const specifiedElement = document.getElementById("Flags");

  document.addEventListener("click", function (event) {
    const isClickInside = specifiedElement?.contains(event.target as Node);

    if (!isClickInside) {
      setDisplayList(false);
    } else setDisplayList(true);
  });
  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value === "" || phoneNoReg.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleInputOnPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const number = event.clipboardData.getData("Text");
    let callingCode = "+" + number.slice(0, 4);
    var trimCallingCode = "";
    for (const item of callingCode) {
      trimCallingCode = trimCallingCode + item;
      const country = countryDetails.find(
        // eslint-disable-next-line no-loop-func
        (item: Country) => item?.countryCallingCode === trimCallingCode
      );
      if (country) {
        setFlag(flagURL + `${country?.countryCode}.webp`);
      }
    }
  };
  return (
    <div>
      <div className="phone-number-field">
        <img
          alt={"flag"}
          src={flag}
          className="phone-number-field__menu__item__img"
        />
        <button
          className="phone-number-field__button"
          type="button"
          id="Flags"
          onClick={() => {
            setDisplayList(!displayList);
          }}
        >
          {/* <IconBack /> */}
        </button>
        <span
          className={`subtitle-3 ml-2 ${
            phoneNumber ? "font-color-black" : "grey-color-text"
          }`}
        >
          +
        </span>
        <input
          maxLength={15}
          placeholder="123 456 7891"
          className="phone-number-field__input"
          value={phoneNumber ? phoneNumber : ""}
          onChange={(e) => {
            setIsFlagSelected(false);
            handleInputOnChange(e);
          }}
          onPaste={(event) => {
            handleInputOnPaste(event);
          }}
          type="text"
        />
      </div>
      <div
        className={`phone-number-field__menu ${
          displayList ? "d-block" : "d-none"
        }`}
      >
        {countryDetails.map((item) => {
          return (
            <div
              onClick={() => {
                setPhoneNumber(parseInt(item?.countryCallingCode));
                setIsFlagSelected(true);
              }}
              //TODO: Save calling code or name to display selected on the screen.
              className={"phone-number-field__menu__item"}
            >
              <img
                alt={"flag"}
                src={flagURL + `${item?.countryCode}.webp`}
                className="phone-number-field__menu__item__img ml-3"
              />
              <span className="phone-number-field__menu__item__country-name">
                {item?.countryName}
              </span>
              <span className="phone-number-field__menu__item__country-code ml-2">
                {item?.countryCallingCode}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
