import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TSUserInfo, PhoneInputState } from "../types";
import {
  isEmailValid,
  isPhoneNumberValid,
  isCityValid,
  isFirstNameValid,
  isLastNameValid,
} from "../utils/validations";
import { FunctionalPhoneInput } from "./FunctionalPhoneInput";

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

  const reset = () => {
    setInputFirstName("");
    setInputLastName("");
    setInputEmail("");
    setInputCity("");
    setInputPhoneNumber(["", "", "", ""]);
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
          return;
        }
        setIsSubmitted(false);
        getUserInformation({
          firstName: capitalize(inputFirstName),
          lastName: capitalize(inputLastName),
          email: inputEmail,
          city: capitalize(inputCity),
          phone: formatPhoneNumber(inputPhoneNumber),
        });
        reset();
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}

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

      {shouldShowFirstNameError && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}

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

      {shouldShowLastNameError && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}
      {/* Email Input */}

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

      {shouldShowInputEmailError && (
        <ErrorMessage message={emailErrorMessage} show={true} />
      )}
      {/* City Input */}

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

      {shouldShowCityInputError && (
        <ErrorMessage message={cityErrorMessage} show={true} />
      )}

      <FunctionalPhoneInput
        inputPhoneNumber={inputPhoneNumber}
        setInputPhoneNumber={setInputPhoneNumber}
      />

      {shouldShowInputPhoneNumberError && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
