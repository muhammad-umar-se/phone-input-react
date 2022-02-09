# Phone Input React (TypeScript)

Highly customizable phone input component with auto formatting.

[![npm version](https://img.shields.io/npm/v/react-phone-input-2.svg?style=flat)](https://www.npmjs.com/package/phone-input-react)
[![npm downloads](https://img.shields.io/npm/dm/react-phone-input-2.svg?style=flat)](https://www.npmjs.com/package/phone-input-react)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/muhammad-umar-se/phone-input-react#contributing)
[![travis build](https://travis-ci.org/bl00mber/react-phone-input-2.svg?branch=master)](https://github.com/muhammad-umar-se/phone-input-react)

<!-- ![animation](https://media.giphy.com/media/xiORAWnqoTJDsH0UOI/giphy.gif) -->

![animation](https://imgur.com/phjYfx7)

## Installation

```shell-script
npm i phone-input-react --save
```

## Usage

```jsx
import PhoneInput from 'phone-input-react'
<PhoneInput
  phoneNumber: string;
  setPhoneNumber: (v: string|number) => void;
  defaultFlag?: string;
  startingSymbol?: string;
  className?: string;
/>
```

## Contributing

- Code style changes not allowed
- Do not create issues about incorrect or missing country masks (of already present countries) or absent area codes (they will be closed). Only create issues if the subject is an actual mechanism that is not present in the component. Otherwise create a PR with a link that proves the correctness of your newly suggested mask or list of area codes
- Do not send new languages

## License

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bl00mber/react-phone-input-2/blob/master/LICENSE)

Based on [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js)
