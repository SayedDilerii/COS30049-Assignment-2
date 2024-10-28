import { useState } from "react";
import { Button } from "../ui/button";
import PropertySelectorCheckBox from "./SettingsPropertySelectorCheckBox";

const SettingsNotifications: React.FC = () => {
  const defaultValue = [
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
      bool: [true, true, true], // Change this to boolean values
    },
  ];

  const [formData, setFormData] = useState(defaultValue);

  const formHandler = (heading: string, index: number) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.heading === heading
          ? {
              ...item,
              bool: item.bool.map((b, i) => (i === index ? !b : b)), // Toggle the checkbox state
            }
          : item
      )
    );
  };

  const formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={formSubmitHandler} className="pr-10 mt-2">
      {formData.map((value, index) => (
        <div key={index} className={index > 0 ? "pt-4" : ""}>
          <PropertySelectorCheckBox
            heading={value.heading}
            caption={value.caption}
            checkboxItem={value.checkboxItem}
            bool={value.bool}
            formValue={formHandler} // Pass the handler
          />
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

export default SettingsNotifications;
