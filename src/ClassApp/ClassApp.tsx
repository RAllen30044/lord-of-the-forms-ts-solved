import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation,State } from "../types";
import { ProfileInformation } from "../ProfileInformation";


export const defaultUser: UserInformation = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: "12344556767",
  city: "Hobbiton",
};

export class ClassApp extends Component<Record<string, never>, State> {
  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            defaultUser
          }
        />
        <ClassForm />
      </>
    );
  }
}
