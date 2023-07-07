export const capitalize = (name: string) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  const newName = name.slice(1, name.length);
  const firstLetter = name.slice(0, 1);
  const capitlizeFirstLetter = firstLetter.toUpperCase();
  const keepLower = newName.toLowerCase();
 

  return capitlizeFirstLetter + keepLower;
};

export const formatPhoneNumber = () => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
};
