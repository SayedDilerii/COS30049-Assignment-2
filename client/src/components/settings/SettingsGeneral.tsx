import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Button } from "../ui/button";
import PropertySelector from "./SettingsPropertySelector";

type SettingItem = {
  heading: string;
  caption: string;
  value: string;
  items: string[];
};

const defaultValue: SettingItem[] = [
  { heading: "Temperature", caption: "Select temperature unit", value: "Celsius", items: ["Celsius", "Fahrenheit"] },
  { heading: "Date format", caption: "Select date format", value: "YYYY-MM-DD", items: ["YYYY-MM-DD", "DD-MM-YYYY"] },
  { heading: "Time format", caption: "Select time format", value: "hh:mm:ss", items: ["hh:mm:ss", "mm:hh:ss"] },
  { heading: "Timezone", caption: "Select timezone", value: "Melbourne/Australia", items: ["Melbourne/Australia"] },
  { heading: "Auto-refresh", caption: "Set refresh interval", value: "Every 2-Minutes", items: ["Every 2-Minutes", "Every 5-Minutes", "Every 10-Minutes"] },
];

const GeneralSettings: React.FC = () => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("generalSettings", defaultValue);

  const [formData, setFormData] = useState<SettingItem[]>(localStorageValue);

  const formHandler = (heading: string, selectedValue: string) => {
    setFormData((prevData) => prevData.map((item) => (item.heading === heading ? { ...item, value: selectedValue } : item)));
  };

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLocalStorageValue(formData);
  };

  const resetHandler = () => {
    setFormData(defaultValue);
  };

  return (
    <form onSubmit={formSubmitHandler} className="pr-10 mt-2">
      {formData.map((value, index) => (
        <div key={index} className={index > 0 ? "pt-4" : ""}>
          <PropertySelector heading={value.heading} value={value.value} caption={value.caption} items={value.items} formValue={formHandler} />
        </div>
      ))}
      <div className="flex justify-end pt-3 gap-8">
        <Button className="w-28 bg-zinc-400" onClick={resetHandler} type="reset">
          Reset
        </Button>
        <Button className="w-28" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default GeneralSettings;
