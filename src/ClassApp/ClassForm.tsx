import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TSUserInfo } from "../types";
import { ClassPhoneInput } from "./ClassPhoneInput";
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
import { ClassInputProps } from "./ClassInputProps";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "City is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<TSUserInfo> {
  state = {
    inputFirstName: "",
    inputLastName: "",
    inputEmail: "",
    inputCity: "",
    isSubmitted: false,
    inputPhoneNumber: ["", "", "", ""],
  };
  reset = () => {
    this.setState({ inputFirstName: "" });
    this.setState({ inputLastName: "" });
    this.setState({ inputCity: "" });
    this.setState({ inputEmail: "" });
    this.setState({ inputPhoneNumber: ["", "", "", ""] });
  };

  handlePhoneNumberChange = (phoneNumber: string[]) => {
    this.setState({ inputPhoneNumber: phoneNumber });
  };
  render() {
    const {
      isSubmitted,
      inputCity,
      inputEmail,
      inputLastName,
      inputFirstName,
      inputPhoneNumber,
    } = this.state;
    const shouldShowFirstNameError =
      isSubmitted && !isFirstNameValid(inputFirstName);
    const shouldShowLastNameError =
      isSubmitted && !isLastNameValid(inputLastName);
    const shouldShowInputEmailError = isSubmitted && !isEmailValid(inputEmail);
    const shouldShowInputPhoneNumberError =
      isSubmitted && !isPhoneNumberValid(inputPhoneNumber);

    const shouldShowCityInputError = isSubmitted && !isCityValid(inputCity);

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
            this.setState({ isSubmitted: true });
            return;
          }
          this.setState({ isSubmitted: false });
          this.props.getUserInformation({
            firstName: capitalize(inputFirstName),
            lastName: capitalize(inputLastName),
            email: inputEmail,
            city: capitalize(inputCity),
            phone: formatPhoneNumber(inputPhoneNumber),
          });
          this.reset();
        }}
      >
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <ClassInputProps
            label={"First Name"}
            inputProps={{
              type: "text",
              placeholder: "Bilbo",
              value: inputFirstName,
              onChange: ({ target: { value } }) => {
                this.setState({ inputFirstName: preventKeyingNumbers(value) });
              },
            }}
          />
        </div>

        {shouldShowFirstNameError && (
          <ErrorMessage message={firstNameErrorMessage} show={true} />
        )}

        {/* last name input */}
        <div className="input-wrap">
          <ClassInputProps
            label={"Last Name"}
            inputProps={{
              type: "text",
              placeholder: "Baggins",
              value: inputLastName,
              onChange: ({ target: { value } }) => {
                this.setState({ inputLastName: value });
              },
            }}
          />
        </div>
        {shouldShowLastNameError && (
          <ErrorMessage message={lastNameErrorMessage} show={true} />
        )}

        {/* Email Input */}
        <div className="input-wrap">
          <ClassInputProps
            label={"Email"}
            inputProps={{
              type: "text",
              placeholder: "Bilbo-baggins@adventurehobbits.net",
              value: inputEmail,
              onChange: ({ target: { value } }) => {
                this.setState({ inputEmail: value });
              },
            }}
          />
        </div>
        {shouldShowInputEmailError && (
          <ErrorMessage message={emailErrorMessage} show={true} />
        )}

        {/* City Input */}
        <div className="input-wrap">
          <ClassInputProps
            label={"City"}
            inputProps={{
              type: "text",
              placeholder: "Hobbiton",
              value: inputCity,
              list: "cities",
              onChange: ({ target: { value } }) => {
                this.setState({ inputCity: preventKeyingNumbers(value) });
              },
            }}
          />
        </div>

        {shouldShowCityInputError && (
          <ErrorMessage message={cityErrorMessage} show={true} />
        )}

        <ClassPhoneInput
          inputPhoneNumber={inputPhoneNumber}
          phoneNumberChange={this.handlePhoneNumberChange}
        />

        {shouldShowInputPhoneNumberError && (
          <ErrorMessage message={phoneNumberErrorMessage} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
