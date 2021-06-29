import React from "react";
import { Textarea, TextInput, Form, Label } from "@trussworks/react-uswds";

function Textbox({ id, size, type, label, className, onChange }) {
  return size === "area" ? (
    <Form className="maxw-none">
      <Label
        className={`${className} text-primary mobile-lg:font-sans-2xl font-sans-lg maxw-none margin-y-3`}
      >
        {label}
      </Label>
      <Textarea
        id={id}
        name={label}
        className="border-05 border-primary bg-primary-light focus:border-width-6px focus:bg-primary-lighter"
        onChange={onChange}
      />
    </Form>
  ) : (
    <TextInput
      id={id}
      name={label}
      type={type}
      className={`${className} border-05 border-primary bg-primary-light focus:border-width-6px focus:bg-primary-lighter`}
      onChange={onChange}
    />
  );
}

export default Textbox;
