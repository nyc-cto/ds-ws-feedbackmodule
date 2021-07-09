import React from "react";
import { Textarea, TextInput, Label } from "@trussworks/react-uswds";

import {
  LABEL_STYLE,
  TEXTAREA_STYLE,
  TEXTINPUT_STYLE,
} from "../../assets/styling_classnames";

function Textbox({ id, type, label, className, onChange, required }) {
  return (
    <>
      <Label className={`${className} ${LABEL_STYLE}`} htmlFor={id}>
        {`${label}${required ? "*" : ""}`}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          name={label}
          className={TEXTAREA_STYLE}
          onChange={onChange}
        />
      ) : (
        <TextInput
          id={id}
          name={label}
          type={type}
          className={`${className} ${TEXTINPUT_STYLE}`}
          onChange={onChange}
        />
      )}
    </>
  );
}

export default Textbox;
