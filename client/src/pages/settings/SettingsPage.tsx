import GeneralSettings from "@/components/settings/SettingsGeneral";
import SettingsSidePanel from "@/components/settings/SettingsSidePanel";
import { useState } from "react";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    option: "general",
    selectedTemperature: "Celsius",
    selectedDateFormat: "YYYY-MM-DD",
    selectedTimeFormat: "hh:mm:ss",
    selectedTimezone: "Melbourne/Australia",
    selecedAutoRefresh: "Every 5-Minutes",
  });

  const setOptionsCallback = (optionValue: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      option: optionValue,
    }));
  };

  const handleTemperatureSelect = (format: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      selectedTemperature: format,
    }));
  };

  const handleDateFormatSelect = (format: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      selectedDateFormat: format,
    }));
  };

  const handleTimeFormatSelect = (format: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      selectedTimeFormat: format,
    }));
  };

  const handleTimezoneSelect = (format: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      selectedTimezone: format,
    }));
  };

  const handleAutoRefreshSelect = (format: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      selecedAutoRefresh: format,
    }));
  };

  return (
    <>
      <div className="flex h-full">
        <div className="ml-24">
          <SettingsSidePanel
            callback={(optionValue: string) => setOptionsCallback(optionValue)}
            currentOption={settings.option}
          />
        </div>
        <div className="border-l w-full px-8 mt-24 flex-col">
          {settings.option === "general" && (
            <GeneralSettings
              settings={settings}
              handleTemperatureSelect={handleTemperatureSelect}
              handleDateFormatSelect={handleDateFormatSelect}
              handleTimeFormatSelect={handleTimeFormatSelect}
              handleTimezoneSelect={handleTimezoneSelect}
              handleAutoRefreshSelect={handleAutoRefreshSelect}
            />
          )}
          {settings.option === "options" && <div>options</div>}
          {settings.option === "notification" && <div>notification</div>}
          {settings.option === "privacy" && <div>privacy</div>}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
