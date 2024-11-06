import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { toast } from "sonner";
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
    try {
      event.preventDefault();
      setLocalStorageValue(formData);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Something went wrong, please try again!");
      console.error(error);
    }
  };

  const resetHandler = () => {
    setFormData(defaultValue);
    toast.success("Settings reset successfully!");
  };

  return (
    <form onSubmit={formSubmitHandler} className="pr-10 sm:pr-10">
      {formData.map((value, index) => (
        <div key={index} className={index > 0 ? "pt-4" : ""}>
          <PropertySelector heading={value.heading} value={value.value} caption={value.caption} items={value.items} formValue={formHandler} />
        </div>
      ))}
      <div className="flex justify-end pt-4 gap-2">
        <Button variant={"secondary"} onClick={resetHandler} type="reset">
          Reset to default
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
};

export default GeneralSettings;
