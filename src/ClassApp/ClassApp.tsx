import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { defaultUser,State } from "../types";
import { ProfileInformation } from "../ProfileInformation";



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
