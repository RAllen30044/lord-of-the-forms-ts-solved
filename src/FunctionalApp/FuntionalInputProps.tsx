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
      <div className="input-wrap">
        <label>{label}: </label>
        <input {...inputProps} />
      </div>
    </>
  );
};
