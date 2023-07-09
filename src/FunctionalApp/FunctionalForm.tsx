import { useState, ChangeEventHandler, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TSUserInfo, PhoneInputState } from "../types";
import {
  isEmailValid,
  isPhoneNumberValid,
  isCityValid,
  isFirstNameValid,
  isLastNameValid,
} from "../utils/validations";

import {
  capitalize,
  formatPhoneNumber,
  preventKeyingNumbers,
} from "../utils/transformations";
import { FunctionalInputProps } from "./FuntionalInputProps";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ getUserInformation }: TSUserInfo) => {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState<PhoneInputState>([
    "",
    "",
    "",
    "",
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const shouldShowFirstNameError =
    isSubmitted && !isFirstNameValid(inputFirstName);
  const shouldShowLastNameError =
    isSubmitted && !isLastNameValid(inputLastName);
  const shouldShowInputEmailError = isSubmitted && !isEmailValid(inputEmail);
  const shouldShowInputPhoneNumberError =
    isSubmitted && !isPhoneNumberValid(inputPhoneNumber);

  const shouldShowCityInputError = isSubmitted && !isCityValid(inputCity);

  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const refs = [ref0, ref1, ref2, ref3];

  const createOnChangeHandler =
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
    ({ target: { value } }) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const getValue = value;
      const shouldGotoNextRef =
        currentMaxLength === getValue.length && nextRef?.current;
      const shouldGotoPrevRef = getValue.length === 0 && index !== 0;
      const newState = inputPhoneNumber.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? value.replace(/[^0-9]/g, "") : phoneInput
      ) as PhoneInputState;
      if (shouldGotoNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGotoPrevRef) {
        prevRef.current?.focus();
      }

      setInputPhoneNumber(newState);
    };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          !isCityValid(inputCity) ||
          !isFirstNameValid(inputFirstName) ||
          !isLastNameValid(inputLastName) ||
          !isPhoneNumberValid(inputPhoneNumber) ||
          !isEmailValid(inputEmail)
        ) {
          alert("Bad Input data");
          setIsSubmitted(true);
        } else {
          setIsSubmitted(false);
          getUserInformation({
            firstName: capitalize(inputFirstName),
            lastName: capitalize(inputLastName),
            email: inputEmail,
            city: capitalize(inputCity),
            phone: formatPhoneNumber(inputPhoneNumber),
          });
          setInputFirstName("");
          setInputLastName("");
          setInputEmail("");
          setInputCity("");
          setInputPhoneNumber(["", "", "", ""]);
        }
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <FunctionalInputProps
          label={"First Name"}
          inputProps={{
            type: "text",
            placeholder: "Bilbo",
            value: inputFirstName,
            onChange: ({ target: { value } }) => {
              setInputFirstName(preventKeyingNumbers(value));
            },
          }}
        />
      </div>

      {shouldShowFirstNameError && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}
      <div className="input-wrap">
        <FunctionalInputProps
          label={"Last Name"}
          inputProps={{
            type: "text",
            placeholder: "Baggins",
            value: inputLastName,
            onChange: ({ target: { value } }) => {
              setInputLastName(value);
            },
          }}
        />
      </div>
      {shouldShowLastNameError && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}
      {/* Email Input */}
      <div className="input-wrap">
        <FunctionalInputProps
          label={"Email"}
          inputProps={{
            type: "text",
            placeholder: "Bilbo-baggins@adventurehobbits.net",
            value: inputEmail,
            onChange: ({ target: { value } }) => {
              setInputEmail(value);
            },
          }}
        />
      </div>
      {shouldShowInputEmailError && (
        <ErrorMessage message={emailErrorMessage} show={true} />
      )}
      {/* City Input */}
      <div className="input-wrap">
        <FunctionalInputProps
          label={"City"}
          inputProps={{
            type: "text",
            placeholder: "Hobbiton",
            value: inputCity,
            list: "cities",
            onChange: ({ target: { value } }) => {
              setInputCity(preventKeyingNumbers(value));
            },
          }}
        />
      </div>

      {shouldShowCityInputError && (
        <ErrorMessage message={cityErrorMessage} show={true} />
      )}

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={inputPhoneNumber[0]}
            onChange={createOnChangeHandler(0)}
            ref={ref0}
            maxLength={2}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={inputPhoneNumber[1]}
            onChange={createOnChangeHandler(1)}
            ref={ref1}
            maxLength={2}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={inputPhoneNumber[2]}
            onChange={createOnChangeHandler(2)}
            ref={ref2}
            maxLength={2}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={inputPhoneNumber[3]}
            onChange={createOnChangeHandler(3)}
            ref={ref3}
            maxLength={1}
          />
        </div>
      </div>
      {shouldShowInputPhoneNumberError && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
