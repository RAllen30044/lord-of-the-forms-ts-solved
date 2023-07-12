import { useRef, ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { PhoneInputState } from "../types";

export const FunctionalPhoneInput = ({
  inputPhoneNumber,
  setInputPhoneNumber,
}: {
  inputPhoneNumber: PhoneInputState;
  setInputPhoneNumber: Dispatch<SetStateAction<PhoneInputState>>;
}) => {
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
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
      ) as PhoneInputState;
      if (shouldGotoNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGotoPrevRef) {
        prevRef.current?.focus();
      }

      setInputPhoneNumber(newState);
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
};
