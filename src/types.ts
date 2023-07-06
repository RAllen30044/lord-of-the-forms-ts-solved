

export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};
export type State = { userInformation: UserInformation | null };

export type PhoneInputState=[string,string, string, string]


export const defaultUser: UserInformation = {
  email: "default@default.com",
  firstName: "Default",
  lastName: "Default",
  phone: "12-34-56-7",
  city: "Hobbiton",
};

export type TSUserInfo = {
  getUserInformation: (userInformation: UserInformation) => void;
};
