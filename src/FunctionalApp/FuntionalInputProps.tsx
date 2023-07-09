import { InputProps } from "../types";

export const FunctionalInputProps = ({
  label,
  inputProps,
}: {
  label: string;
  inputProps: InputProps;
}) => {
  return (
    <>
      <label>{label}: </label>
      <input {...inputProps} />
    </>
  );
};
