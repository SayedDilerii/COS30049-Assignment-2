type TValueMessage = {
  value: string | number | boolean;
  message: string;
};

type TRange = {
  min: number | string;
  max: number | string;
};

type TFieldValidation = {
  requiredMsg: string;
  minWords: TValueMessage;
  maxWords: TValueMessage;
  max?: TValueMessage;
  min?: TValueMessage;
  step?: TValueMessage;
  range?: TRange;
  pattern?: TValueMessage;
  minLength?: TValueMessage;
  maxLength?: TValueMessage;
  isRequired: TValueMessage;
};

type TControlTypes = "textbox" | "radio" | "checkbox" | "date" | "email" | "password" | "number";

type TField = {
  id: string;
  name: string;
  controlType: TControlTypes;
  label: string;
  labelFooter?: string;
  defaultValue?: unknown;
  disabled?: boolean;
  inputFieldComponent?: React.FC<unknown>;
  placeholder?: string;
  validation: TFieldValidation;
  dependency?: TField["id"];
};

const fields: TField[] = [
  {
    id: "first_name",
    name: "firstName",
    controlType: "textbox",
    label: "First name",
    placeholder: "Your first name...",
    validation: {
      requiredMsg: "This field is required",
      isRequired: { value: false, message: "This field is required" },
      minWords: { value: 4, message: "Min character limit reached" },
      maxWords: { value: 12, message: "Max character limit reached" },
    },
  },
  {
    id: "last_name",
    name: "lastName",
    controlType: "textbox",
    label: "Last Name",
    placeholder: "Your last name...",
    dependency: "first_name",
    validation: {
      requiredMsg: "This field is required",
      isRequired: { value: false, message: "This field is required" },
      minWords: { value: 4, message: "Min character limit reached" },
      maxWords: { value: 12, message: "Max character limit reached" },
    },
  },
];
