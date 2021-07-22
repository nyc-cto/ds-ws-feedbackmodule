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
}) {
  return (
    <>
      <Label className={`${className} ${LABEL_STYLE}`} htmlFor={id}>
        {`${label}${required ? "*" : ""}`}
      </Label>
      {(console.log(invalid), console.log(describedBy))}
      {type === "textarea" ? (
        <Textarea
          id={id}
          name={label}
          className={TEXTAREA_STYLE}
          onChange={onChange}
          aria-invalid={invalid}
          aria-describedby={invalid ? describedBy : undefined}
        />
      ) : (
        <TextInput
          id={id}
          name={label}
          type={type}
          className={`${className} ${TEXTINPUT_STYLE}`}
          onChange={onChange}
          aria-invalid={invalid}
          aria-describedby={invalid ? describedBy : undefined}
        />
      )}
    </>
  );
}

export default Textbox;
