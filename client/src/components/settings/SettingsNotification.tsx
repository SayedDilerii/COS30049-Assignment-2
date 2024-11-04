import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import PropertySelectorCheckBox from "./SettingsPropertySelectorCheckBox";

type SettingItem = {
  heading: string;
  caption: string;
  checkboxItem: string[]; // Change to string[] for array of items
  bool: boolean[]; // Change to boolean[] for toggle state
};

const defaultValue: SettingItem[] = [
  {
    heading: "Send notifications via",
    caption: "Choose how you want to receive notifications",
    checkboxItem: ["Email Address", "Text Message", "Push Notification"],
    bool: [true, true, true],
  },
  {
    heading: "Notification trigger",
    caption: "Choose when you want to receive notifications",
    checkboxItem: ["Bushfire Warnings", "Extreme Heat", "Fire Hazard"],
    bool: [true, true, true],
  },
];

const SettingsNotifications: React.FC = () => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("notificationSettings", defaultValue);
  const [formData, setFormData] = useState<SettingItem[]>(localStorageValue);

  const formHandler = (heading: string, index: number) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.heading === heading
          ? {
              ...item,
              bool: item.bool.map((b, i) => (i === index ? !b : b)),
            }
          : item
      )
    );
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
    setLocalStorageValue(defaultValue);
  };

  return (
    <form onSubmit={formSubmitHandler} className="pr-10 mt-2">
      {formData.map((value, index) => (
        <div key={index} className={index > 0 ? "pt-4" : ""}>
          <PropertySelectorCheckBox heading={value.heading} caption={value.caption} checkboxItem={value.checkboxItem} bool={value.bool} formValue={formHandler} />
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

export default SettingsNotifications;
