import React from "react";
import { Textarea, TextInput, Label } from "@trussworks/react-uswds";

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
}) {
  return (
    <>
      <Label className={className ?? null} htmlFor={id}>
        {`${label}${required ? "*" : ""}`}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          name={label}
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
          className={className ?? null}
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
