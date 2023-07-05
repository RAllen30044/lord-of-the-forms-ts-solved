

export type UserInformation = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
};
export type State = { userInformation: UserInformation | null };

export type PhoneInputState=[string,string, string, string]


export type TSUserInfo = {
  getUserInformation: (userInformation: UserInformation) => void;
};
