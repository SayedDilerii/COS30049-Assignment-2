import PropertySelector from "@/components/settings/SettingsPropertySelector";
import SettingsSidePanel from "@/components/settings/SettingsSidePanel";
import Container from "@/components/ui/container";
import { useState } from "react";

const SettingsPage: React.FC = () => {
  const [option, setOptions] = useState("general");
  const setOptionsCallback = (optionValue: string) => {
    setOptions(optionValue);
  };

  const [selectedTemperature, setSelectedTemperature] = useState<string>("Celsius");
  const [selectedDateFormat, setSelectedDateFormat] = useState<string>("YYYY-MM-DD");

  const handleTemperatureSelect = (format: string) => {
    setSelectedTemperature(format);
  };

  const handleDateFormatSelect = (format: string) => {
    setSelectedDateFormat(format);
  };

  return (
    <>
      <Container className="flex h-full mx-20">
        {/** Side panel div **/}
        <div className="ml-24">
          <SettingsSidePanel callback={(optionValue: string) => setOptionsCallback(optionValue)} currentOption={option} />
        </div>
        <div className="border-l w-full px-8 mt-24 flex-col">
          {option === "general" && (
            <div>
              <div>
                <PropertySelector
                  heading="Temperature"
                  caption="Select temperature unit"
                  triggerText={selectedTemperature}
                  items={["Celsius", "Fahrenheit"]}
                  onSelect={handleTemperatureSelect}
                />
              </div>
              <div className="pt-4">
                <PropertySelector
                  heading="Date format"
                  caption="Select date format"
                  triggerText={selectedDateFormat}
                  items={["YYYY-MM-DD", "DD-MM-YYYY"]}
                  onSelect={handleDateFormatSelect}
                />
              </div>
            </div>
          )}
          {option === "options" && <div>options</div>}
          {option === "notification" && <div>notification</div>}
          {option === "privacy" && <div>privacy</div>}
        </div>
      </Container>
    </>
  );
};

export default SettingsPage;
