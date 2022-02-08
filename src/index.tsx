import React, { ChangeEvent, useEffect, useState } from "react";
import { flagUrl, phoneNoReg, removeSpace } from "./constants/constants";
import { countryDetails } from "./constants/CountryDetails";
import { formatIncompletePhoneNumber } from "libphonenumber-js";
import { Country, Input } from "./types/interfaces";
import IconArrowDown from "./assets/IconArrowDown";
export const PhoneInput = (input: Input) => {
  const { phoneNumber, setPhoneNumber } = input;
  const [displayList, setDisplayList] = useState(false);
  const [flag, setFlag] = useState("");
  const [isFlagSelected, setIsFlagSelected] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!phoneNumber.length) setFlag(flagUrl("us"));
    const callingCode = `+${String(phoneNumber).replace(removeSpace, "")}`;
    const getCountryCode = formatIncompletePhoneNumber(callingCode).split(" ");
    const findFlag = countryDetails.find(
      (item) =>
        item?.countryCallingCode ===
        (isFlagSelected ? callingCode : getCountryCode[0])
    );
    if (findFlag) {
      setFlag(flagUrl(findFlag?.countryCode));
      setDisplayList(false);
    }
  }, [phoneNumber, isFlagSelected]);

  const specifiedElement = document.getElementById("Flags");
  document.addEventListener("click", function (event) {
    const isClickInside = specifiedElement?.contains(event.target as Node);
    if (!isClickInside) {
      setDisplayList(false);
    } else {
      setDisplayList(true);
    }
  });

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(removeSpace, "");
    if (value === "" || phoneNoReg.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleInputOnPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    const callingCode = `+${event.clipboardData.getData("Text").slice(0, 4)}`;
    let trimCallingCode = "";
    for (const item of callingCode) {
      trimCallingCode = trimCallingCode + item;
      const country = countryDetails.find(
        (item: Country) => item?.countryCallingCode === trimCallingCode
      );
      if (country) {
        setFlag(flagUrl(country?.countryCode));
      }
    }
  };

  return (
    <div className="w-100">
      <div
        className={`phone-number-field ${
          isActive ? "phone-number-field__active" : ""
        }`}
      >
        <img
          alt={"NF"}
          src={flag}
          className="phone-number-field__menu__item__img rounded"
        />
        <button
          className="phone-number-field__button"
          type="button"
          id="Flags"
          onClick={() => {
            setDisplayList(!displayList);
          }}
        >
          <IconArrowDown />
        </button>
        <span
          className={`subtitle-3 ml-1 ${
            phoneNumber ? "font-color-black" : "grey-color-text"
          }`}
        >
          +
        </span>
        <input
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          maxLength={15}
          placeholder="123 456 7891"
          className="phone-number-field__input"
          value={
            phoneNumber
              ? formatIncompletePhoneNumber("+" + String(phoneNumber)).replace(
                  "+",
                  ""
                )
              : ""
          }
          onChange={(e) => {
            phoneNumber.length < 4 && setIsFlagSelected(false);
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
        {countryDetails.map((item: Country) => {
          return (
            <div
              key={item?.countryCode + item?.countryName}
              onClick={() => {
                setPhoneNumber(parseInt(item?.countryCallingCode));
                setIsFlagSelected(true);
              }}
              className={"phone-number-field__menu__item"}
            >
              <img
                alt={"flag"}
                src={flagUrl(item?.countryCode)}
                className="phone-number-field__menu__item__img rounded"
              />
              <span className="phone-number-field__menu__item__country-name text-truncate">
                {item?.countryName}
              </span>
              <span className="phone-number-field__menu__item__country-code ml-2">
                ({item?.countryCallingCode})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
