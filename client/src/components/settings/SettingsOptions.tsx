import PropertySelector from "@/components/settings/SettingsPropertySelector";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type SettingItem = {
  heading: string;
  caption: string;
  value: string;
  items: string[];
};

const SettingsOptions: React.FC = () => {
  const defaultValue = [
    { heading: "Theme", caption: "Set application theme", value: "System", items: ["System", "Light mode", "Dark mode"] },
    { heading: "Font size", caption: "Set font size", value: "Default", items: ["Default", "10", "14"] },
    { heading: "Navigation date visibility", caption: "Set visibility of dates in the navigation bar", value: "Visible", items: ["Visible", "Hidden"] },
  ];
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("optionsSettings", defaultValue);
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
  };
  return (
    <form onSubmit={formSubmitHandler} className="pr-10 mt-2">
      {formData.map((value, index) => (
        <div key={index} className={index > 0 ? "pt-4" : ""}>
          <PropertySelector heading={value.heading} caption={value.caption} items={value.items} value={value.value} formValue={formHandler} />
        </div>
      ))}
      <div className="flex justify-end pt-4 gap-2">
        <Button variant={"secondary"} onClick={resetHandler} type="reset">
          Reset to default
        </Button>
        <Button className="text-[12px]" type="submit">
          Save changes
        </Button>
      </div>
    </form>
  );
};

export default SettingsOptions;
