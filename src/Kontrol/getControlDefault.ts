import type {
  ControlType,
  OptionsFromType,
  ReturnTypeFromOptions,
} from "./inference";

export function getControlDefaultValue<C extends OptionsFromType<ControlType>>(
  control: C
): ReturnTypeFromOptions<C> {
  if ("default" in control && control.default !== undefined) {
    return control.default as ReturnTypeFromOptions<C>;
  }
  if (control.type === "Select") {
    return Object.values(control.options)[0] as ReturnTypeFromOptions<C>;
  }
  if (control.type === "Number") {
    if (control.min !== undefined) {
      return control.min as ReturnTypeFromOptions<C>;
    }
    return 0 as ReturnTypeFromOptions<C>;
  }
  if (control.type === "Toggle") {
    return false as ReturnTypeFromOptions<C>;
  }
  if (control.type === "Color") {
    return "#FF0000" as ReturnTypeFromOptions<C>;
  }
  throw new Error(`Unknown Control Type`);
}
