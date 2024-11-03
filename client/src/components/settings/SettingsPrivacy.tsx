import PropertySelector from "@/components/settings/SettingsPropertySelector";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import { Button } from "../ui/button";

type SettingItem = {
  heading: string;
  caption: string;
  value: string;
  items: string[];
};

const defaultValue = [
  { heading: "Location permissions", caption: "Choose if you want to share your location data with us", value: "Allow location", items: ["Allow location", "Hide location"] },
];

const SettingsPrivacy: React.FC = () => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage("privacySettings", defaultValue);

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
          <PropertySelector heading={value.heading} caption={value.caption} items={value.items} value={value.value} formValue={formHandler} />
        </div>
      ))}
      <div className="flex justify-end pt-3 gap-8">
        <Button className="w-28 bg-zinc-400" onClick={resetHandler} type="reset">
          Reset
        </Button>{" "}
        <Button className="w-28" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default SettingsPrivacy;
