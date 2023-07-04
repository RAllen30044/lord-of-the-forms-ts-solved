import { ComponentProps, FormEvent } from "react";

export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};
export type State = { userInformation: UserInformation | null };

export type InputProps = ComponentProps<"input">;
export type TSEventElement = {
  e: React.FormEvent<HTMLFormElement>;
};
export type TSUserInfo = {
  getUserInformation: (userInformation: UserInformation) => void;
};
