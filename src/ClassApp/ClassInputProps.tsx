import { Component } from "react";
import { InputProps } from "../types";

export class ClassInputProps extends Component<{
  label: string;
  inputProps: InputProps;
}> {
  render() {
    const { label, inputProps } = this.props;
    return (
      <>
        <label>{label}: </label>
        <input {...inputProps} />
      </>
    );
  }
}
