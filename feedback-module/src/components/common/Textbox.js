import React from "react";
import { Textarea, TextInput, Label } from "@trussworks/react-uswds";

import {
  LABEL_STYLE,
  TEXTAREA_STYLE,
  TEXTINPUT_STYLE,
} from "../../assets/styling_classnames";

function Textbox({
  id,
  type,
  label,
  className,
  onChange,
  required,
  describedBy,
  invalid,
  inputRef,
  showErrors,
}) {
  return (
    <>
      <Label className={`${className} ${LABEL_STYLE}`} htmlFor={id}>
        {`${label}${required ? "*" : ""}`}
      </Label>
      {showErrors}
      {/* {invalid && <div className="margin-bottom-3"></div>} */}
      {type === "textarea" ? (
        <Textarea
          id={id}
          name={label}
          className={`${TEXTAREA_STYLE} ${invalid && "margin-top-3"} `}
          onChange={onChange}
          aria-invalid={invalid}
          aria-describedby={invalid ? describedBy : undefined}
          inputRef={inputRef}
        />
      ) : (
        <TextInput
          id={id}
          name={label}
          type={type}
          className={`${className} ${TEXTINPUT_STYLE} ${
            invalid && "margin-top-3"
          }`}
          onChange={onChange}
          aria-invalid={invalid}
          aria-describedby={invalid ? describedBy : undefined}
          inputRef={inputRef}
        />
      )}
    </>
  );
}

export default Textbox;
