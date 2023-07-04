import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { defaultUser } from "../ClassApp/ClassApp";
import { UserInformation } from "../types";
import{useState} from "react";

export const FunctionalApp = () => {
  const [userInformation, setUserInformation]= useState<UserInformation|null>(null);
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={defaultUser} />
      <FunctionalForm getUserInformation={(userInformation)=>{
        setUserInformation(userInformation)
      }} />
    </>
  );
};
