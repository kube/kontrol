import type { ControlType, OptionsFromType } from "./context";

export function getControlDefaultValue(control: OptionsFromType<ControlType>) {
  console.log("getControlDefaultValue", control);
  if ("default" in control && control.default !== undefined) {
    if (control.type === "Select") {
      console.log("Using default value for select", control.default);
    }
    return control.default;
  }
  if (control.type === "Select") {
    console.log(
      "Using first value for select",
      Object.values(control.options)[0]
    );
    return Object.values(control.options)[0];
  }
  if (control.type === "Number") {
    if (control.min !== undefined) {
      return control.min;
    }
    return 0;
  }
  if (control.type === "Toggle") {
    return false;
  }
  if (control.type === "Color") {
    return "#FF0000";
  }
  throw new Error(`Unknown Control Type`);
}
