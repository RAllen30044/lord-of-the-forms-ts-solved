import { createRef, ChangeEventHandler, Component } from "react";

export class ClassPhoneInput extends Component<{
  inputPhoneNumber: string[];
  phoneNumberChange: (phoneNumber: string[]) => void;
}> {
  render() {
    const { inputPhoneNumber, phoneNumberChange } = this.props;
    const ref0 = createRef<HTMLInputElement>();
    const ref1 = createRef<HTMLInputElement>();
    const ref2 = createRef<HTMLInputElement>();
    const ref3 = createRef<HTMLInputElement>();
    const refs = [ref0, ref1, ref2, ref3];

    const createOnChangeHandler =
      (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
      ({ target: { value } }) => {
        const lengths = [2, 2, 2, 1];
        const currentMaxLength = lengths[index];
        const nextRef = refs[index + 1];
        const prevRef = refs[index - 1];
        const getValue = value;
        const shouldGotoNextRef =
          currentMaxLength === getValue.length && nextRef?.current;
        const shouldGotoPrevRef = getValue.length === 0 && index !== 0;
        const newState = inputPhoneNumber.map((phoneInput, phoneInputIndex) =>
          index === phoneInputIndex ? value.replace(/[^0-9]/g, "") : phoneInput
        );
        if (shouldGotoNextRef) {
          nextRef.current?.focus();
        }

        if (shouldGotoPrevRef) {
          prevRef.current?.focus();
        }
        phoneNumberChange(newState);
      };

    return (
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            placeholder="55"
            value={inputPhoneNumber[0]}
            onChange={createOnChangeHandler(0)}
            ref={ref0}
            maxLength={2}
          />
          -
          <input
            type="text"
            id="phone-input-2"
            placeholder="55"
            value={inputPhoneNumber[1]}
            onChange={createOnChangeHandler(1)}
            ref={ref1}
            maxLength={2}
          />
          -
          <input
            type="text"
            id="phone-input-3"
            placeholder="55"
            value={inputPhoneNumber[2]}
            onChange={createOnChangeHandler(2)}
            ref={ref2}
            maxLength={2}
          />
          -
          <input
            type="text"
            id="phone-input-4"
            placeholder="5"
            value={inputPhoneNumber[3]}
            onChange={createOnChangeHandler(3)}
            ref={ref3}
            maxLength={1}
          />
        </div>
      </div>
    );
  }
}
