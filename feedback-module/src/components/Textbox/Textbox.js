import React from "react";
import { Textarea } from "@trussworks/react-uswds";

import styles from "./Textbox.module.scss";

function Textbox({ id }) {
  return <Textarea id={id} name={id} className={styles.textbox} />;
}

export default Textbox;
