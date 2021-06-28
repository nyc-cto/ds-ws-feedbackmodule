import React from "react";
import { Textarea, TextInput } from "@trussworks/react-uswds";

function Textbox({ id, size, type }) {
  return size === "area" ? (
    <Textarea
      id={id}
      name={id}
      className="border-05 border-primary bg-primary-light focus:border-width-6px focus:bg-primary-lighter"
    />
  ) : (
    <TextInput
      id={id}
      name={id}
      type={type}
      className="border-05 border-primary bg-primary-light focus:border-width-6px focus:bg-primary-lighter"
    />
  );
}

export default Textbox;
