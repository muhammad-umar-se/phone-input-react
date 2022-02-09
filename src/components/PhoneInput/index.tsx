import { ChangeEvent, FC, useEffect, useState } from 'react';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { Country, PhoneInputProps } from '@src/types';
import { flagUrl, phoneNoReg, removeSpace } from '@utils/constants';
import { countryDetails } from '@utils/CountryDetails';
import IconArrowDown from '@src/assets/IconArrowDown';
import '../../style/index.css';

const PhoneInput: FC<PhoneInputProps> = (input: PhoneInputProps) => {
  const { phoneNumber, setPhoneNumber, defaultFlag = '', startingSymbol = '+',className } = input;
  const [flag, setFlag] = useState(defaultFlag);

  const [displayList, setDisplayList] = useState(false);
  const [isFlagSelected, setIsFlagSelected] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!phoneNumber.length) setFlag(flagUrl('us'));
    const callingCode = `+${String(phoneNumber).replace(removeSpace, '')}`;
    const getCountryCode = formatIncompletePhoneNumber(callingCode).split(' ');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const findFlag: Country | undefined = countryDetails.find(
      (item: Country) => item?.countryCallingCode === (isFlagSelected ? callingCode : getCountryCode[0]),
    );
    if (findFlag) {
      setFlag(flagUrl(findFlag?.countryCode));
      setDisplayList(false);
    }
  }, [phoneNumber, isFlagSelected]);

  const specifiedElement = document.getElementById('Flags');
  document.addEventListener('click', (event) => {
    const isClickInside = specifiedElement?.contains(event.target as Node);
    if (!isClickInside) {
      setDisplayList(false);
    } else {
      setDisplayList(true);
    }
  });

  const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(removeSpace, '');
    if (value === '' || phoneNoReg.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleInputOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const callingCode = `+${event.clipboardData.getData('Text').slice(0, 4)}`;
    let trimCallingCode = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const item of callingCode) {
      trimCallingCode += item;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const country: Country | undefined = countryDetails.find(
        // eslint-disable-next-line no-loop-func
        (countryItem: Country) => countryItem?.countryCallingCode === trimCallingCode,
      );
      if (country) {
        setFlag(flagUrl(country?.countryCode));
      }
    }
  };

  return (
    <div className={`phone-number-field__main-container ${className || ''}`}>
      <div className={`phone-number-field ${isActive ? 'phone-number-field__active' : ''}`}>
        <img alt="NF" src={flag} className="phone-number-field__menu__item__img" />
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
        <span className={`${phoneNumber ? 'font-color-black' : 'grey-color-text'}`}>{startingSymbol}</span>
        <input
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          maxLength={15}
          placeholder="123 456 7891"
          className="phone-number-field__input"
          value={
            phoneNumber
              ? formatIncompletePhoneNumber(startingSymbol + String(phoneNumber)).replace(startingSymbol, '')
              : ''
          }
          onChange={(e) => {
            if (phoneNumber?.length < 4) {
              setIsFlagSelected(false);
            }
            handleInputOnChange(e);
          }}
          onPaste={(event) => {
            handleInputOnPaste(event);
          }}
          type="text"
        />
      </div>
      <div className={`phone-number-field__menu ${displayList ? 'd-block' : 'd-none'}`}>
        {countryDetails.map((item: Country) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <div
            key={item?.countryCode + item?.countryName}
            onClick={() => {
              setPhoneNumber(Number(item?.countryCallingCode));
              setIsFlagSelected(true);
            }}
            className="phone-number-field__menu__item"
          >
            <img alt="flag" src={flagUrl(item?.countryCode)} className="phone-number-field__menu__item__img" />
            <span className="phone-number-field__menu__item__country-name">{item?.countryName}</span>
            <span className="phone-number-field__menu__item__country-code">({item?.countryCallingCode})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PhoneInput;
