import React from "react";
import { Textarea, TextInput } from "@trussworks/react-uswds";

import styles from "./Textbox.module.scss";

function Textbox({ id, size, type }) {
  return size === "area" ? (
    <Textarea id={id} name={id} className={styles.textbox} />
  ) : (
    <TextInput id={id} name={id} className={styles.textbox} type={type} />
  );
}

export default Textbox;
