export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}
export function isPhoneNumberValid(phoneNumber: string[]) {
    const regex=/[a-zA-Z]/;
    const numberString = phoneNumber.join("")
 

    return !regex.test(numberString) && numberString.length===7;
 
   

}
1