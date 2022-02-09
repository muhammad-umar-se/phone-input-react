export var style = {
    "phone-number-field": {
        display: "flex",
        alignItems: "center",
        background: "#fff",
        border: "1px solid #cacaca",
        borderRadius: "5px",
        height: "55px",
        width: "100%",
        outline: "none",
        padding: "0 0.5rem",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease"
    },
    "phone-number-field__main-container": { width: "100%" },
    "phone-number-field__active": {
        border: "1px solid black",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
    },
    "phone-number-field__input": {
        width: "100%",
        height: "100%",
        minHeight: "2.75rem",
        border: "none",
        background: "white"
    },
    "phone-number-field__input::placeholder": { color: "gray" },
    "phone-number-field__input:focus-visible": { outline: "none" },
    "phone-number-field__button": {
        outline: "none",
        background: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "0.25rem"
    },
    "phone-number-field__button svg": {
        height: "10px",
        width: "10px",
        fill: "black"
    },
    "phone-number-field__menu": {
        zIndex: 1,
        position: "absolute",
        padding: "0.625rem 0",
        boxShadow: "1px 2px 18px #000",
        backgroundColor: "white",
        width: "18.75rem",
        maxHeight: "13.75rem",
        overflowY: "scroll",
        borderRadius: "0.5rem",
        marginTop: "0.5rem"
    },
    "phone-number-field__menu__item": {
        display: "flex",
        alignItems: "center",
        padding: "0.75rem",
        whiteSpace: "nowrap"
    },
    "phone-number-field__menu__item__img": {
        height: "1.25rem",
        width: "1.5625rem",
        maxHeight: "1.25rem",
        maxWidth: "1.5625rem",
        boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
    },
    "phone-number-field__menu__item__country-name": {
        margin: "0 0 0 12px",
        color: "black"
    },
    "phone-number-field__menu__item__country-code": {
        color: "#6b6b6b",
        margin: "0 auto 0 0.5rem"
    },
    "d-block": { display: "block" },
    "d-none": { display: "none" },
    "font-color-black": { color: "black" },
    "grey-color-text": { color: "#6b6b6b" }
};
