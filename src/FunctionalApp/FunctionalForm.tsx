import { useState, ChangeEventHandler, useRef } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TSUserInfo, PhoneInputState } from "../types";
import { isEmailValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { capitalize } from "../utils/transformations";

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

  const isLastNameValid = inputLastName.length < 2;
  const isFirstNameValid = inputFirstName.length < 2;
  const isCityValid = allCities.includes(inputCity);
  const isPhoneNumberValid = inputPhoneNumber.join("").length === 7;

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
        index === phoneInputIndex ? value : phoneInput
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
        getUserInformation({
          firstName: inputFirstName,
          lastName: inputLastName,
          email: inputEmail,
          city: inputCity,
          phone: `${inputPhoneNumber[0]}-${inputPhoneNumber[1]}-${inputPhoneNumber[2]}-${inputPhoneNumber[3]}`,
        });
        setInputFirstName("");
        setInputLastName("");
        setInputEmail("");
        setInputCity("");
        setInputPhoneNumber(["", "", "", ""]);
      }}
    >
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input
          placeholder="Bilbo"
          value={inputFirstName}
          onChange={({ target: { value } }) => {
            setInputFirstName(capitalize(value));
          }}
        />
      </div>

      {isFirstNameValid && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input
          placeholder="Baggins"
          value={inputLastName}
          onChange={({ target: { value } }) => {
            setInputLastName(capitalize(value));
          }}
        />
      </div>
      {isLastNameValid && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}
      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={inputEmail}
          onChange={({ target: { value } }) => {
            setInputEmail(value);
          }}
        />
      </div>
      {isEmailValid(inputEmail) || (
        <ErrorMessage message={emailErrorMessage} show={true} />
      )}
      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input
          placeholder="Hobbiton"
          value={inputCity}
          onChange={({ target: { value } }) => {
            setInputCity(capitalize(value));
          }}
        />
      </div>
      {isCityValid || <ErrorMessage message={cityErrorMessage} show={true} />}

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
      {isPhoneNumberValid || (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}
      <input type="submit" value="Submit" />
    </form>
  );
};
