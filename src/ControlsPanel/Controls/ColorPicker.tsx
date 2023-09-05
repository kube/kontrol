import React from "react";
import * as styles from "./ColorPicker.css";

export const ColorPicker: React.FC<React.HTMLProps<HTMLInputElement>> = ({
  ...props
}) => {
  return <input className={styles.ColorPicker} type="color" {...props} />;
};
