import PropertySelector from "@/components/settings/SettingsPropertySelector";
import { useState } from "react";
import { Button } from "../ui/button";

const SettingsOptions: React.FC = () => {
  const defaultValue = [
    { heading: "Theme", caption: "Set application theme", value: "System", items: ["System", "Light mode", "Dark mode"] },
    { heading: "Font size", caption: "Set font size", value: "Default", items: ["Default", "10", "14"] },
    { heading: "Navigation date visibility", caption: "Set visibility of dates in the navigation bar", value: "Visible", items: ["Visible", "Hidden"] },
  ];

  const [formData, setFormData] = useState(defaultValue);

  const formHandler = (heading: string, selectedValue: string) => {
    setFormData((prevData) => prevData.map((item) => (item.heading === heading ? { ...item, value: selectedValue } : item)));
  };

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={formSubmitHandler} className="pr-10 mt-2">
      {formData.map((value, index) => (
        <div key={index} className={index > 0 ? "pt-4" : ""}>
          <PropertySelector heading={value.heading} caption={value.caption} items={value.items} formValue={formHandler} />
        </div>
      ))}
      <div className="flex justify-end pt-3 gap-8">
        <Button className="w-28 bg-zinc-400">Reset</Button>
        <Button className="w-28" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default SettingsOptions;
