import PropertySelector from "@/components/settings/SettingsPropertySelector";
import { useState } from "react";
import { Button } from "../ui/button";

const SettingsPrivacy: React.FC = () => {
  const defaultValue = [
    { heading: "Location permissions", caption: "Choose if you want to share your location data with us", value: "Allow location", items: ["Allow location", "Hide location"] },
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

export default SettingsPrivacy;
