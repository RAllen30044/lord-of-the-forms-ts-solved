export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}
export function isPhoneNumberValid(phoneNumber: string[]) {
    const numbersToCheck = "0123456789".split("");
    const numberString = phoneNumber.join("").split("");
 
    for (const number of numberString) {
      if (numbersToCheck.includes(number)&& phoneNumber.join("").length === 7) {
        console.log(numberString);
        console.log(number);
        return true;
      } else{
        return false;
      }
    
    }
    return false;
   
  }
