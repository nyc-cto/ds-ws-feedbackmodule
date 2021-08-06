import React from "react";
import { TextInput, Label, CharacterCount } from "@trussworks/react-uswds";

import { TEXTAREA_MAX_CHAR, OTHER_MAX_CHAR } from "../../lib/constants";

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
      <Label className={className} htmlFor={id}>
        {`${label}${required ? "*" : ""}`}
      </Label>
      {showErrors}
      {type === "textarea" ? (
        <CharacterCount
          id={id}
          name={label}
          onChange={onChange}
          aria-invalid={invalid}
          aria-describedby={invalid ? describedBy : undefined}
          inputRef={inputRef}
          maxLength={TEXTAREA_MAX_CHAR}
          isTextArea
        />
      ) : id === "other-field" ? (
        <CharacterCount
          id={id}
          name={label}
          type={type}
          onChange={onChange}
          aria-invalid={invalid}
          aria-describedby={invalid ? describedBy : undefined}
          inputRef={inputRef}
          maxLength={OTHER_MAX_CHAR}
        />
      ) : (
        <TextInput
          id={id}
          name={label}
          type={type}
          className={className}
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
