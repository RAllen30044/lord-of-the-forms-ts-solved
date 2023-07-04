import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TSUserInfo, InputProps, TSEventElement} from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

const TextInput =({type, label, inputProps, placeholder}:{
  label:string;
  type: string;
  placeholder: string;
  inputProps: InputProps;
})=>{
  return(  <div>
  <label>{label}</label>
  <input type={type} placeholder={placeholder} {...inputProps}/>
 </div> )
}




export const FunctionalForm = ({ getUserInformation }: TSUserInfo) => {


  const [inputFirstName, setInputFirstName] = useState("");

  const [inputLastName, setInputLastName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputCity, setInputCity] = useState("");
  const [inputPhoneNumber, setInputPhoneNumber] = useState(["", "", "", ""]);


  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      getUserInformation({
        firstName:inputFirstName,
        lastName:inputLastName,
        email:inputEmail,
        city:inputCity,
        phone:`${inputPhoneNumber[0]} ${inputPhoneNumber[1]} ${inputPhoneNumber[2]} ${inputPhoneNumber[3]}`
      })
      setInputFirstName("");
      setInputLastName("");
      setInputEmail("");
      setInputCity("");
      setInputPhoneNumber(["", "", "", ""]);
      
      }}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <label>{"First Name"}:</label>
        <input placeholder="Bilbo" />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={true} />

      {/* last name input */}
      <div className="input-wrap">
        <label>{"Last Name"}:</label>
        <input placeholder="Baggins" />
      </div>
      <ErrorMessage message={lastNameErrorMessage} show={true} />

      {/* Email Input */}
      <div className="input-wrap">
        <label>{"Email"}:</label>
        <input placeholder="bilbo-baggins@adventurehobbits.net" />
      </div>
      <ErrorMessage message={emailErrorMessage} show={true} />

      {/* City Input */}
      <div className="input-wrap">
        <label>{"City"}:</label>
        <input placeholder="Hobbiton" />
      </div>
      <ErrorMessage message={cityErrorMessage} show={true} />

      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input type="text" id="phone-input-1" placeholder="55" />
          -
          <input type="text" id="phone-input-2" placeholder="55" />
          -
          <input type="text" id="phone-input-3" placeholder="55" />
          -
          <input type="text" id="phone-input-4" placeholder="5" />
        </div>
      </div>

      <ErrorMessage message={phoneNumberErrorMessage} show={true} />

      <input type="submit" value="Submit" />
    </form>
  );
};
