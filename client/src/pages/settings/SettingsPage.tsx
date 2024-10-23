import GeneralSettings from "@/components/settings/SettingsGeneral";
import SettingsOptions from "@/components/settings/SettingsOptions";
import SettingsSidePanel from "@/components/settings/SettingsSidePanel";
import Container from "@/components/ui/container";
import { useState } from "react";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    option: "general",
    selectedTemperature: "Celsius",
    selectedDateFormat: "YYYY-MM-DD",
    selectedTimeFormat: "hh:mm:ss",
    selectedTimezone: "Melbourne/Australia",
    selecedAutoRefresh: "Every 5-Minutes",
    selectedTheme: "System",
    selectedFontSize: "12",
    selectedNavigationDateVisibility: "Show",
  });

  const stuctrure = {
    option: {
      title: "Timezone",
      description: "",
    },
    value: Array<object>,
  };

  //Dynamically changes the value of Settings based on string (e.g. selectedTemperature)
  const handleSelect = (key: keyof typeof settings, value: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return (
    <Container>
      <div className="flex h-full">
        <div className="ml-24">
          <SettingsSidePanel callback={() => handleSelect} currentOption={settings.option} />
        </div>
        <div className="border-l w-full px-8 mt-24 flex-col">
          {settings.option === "general" && (
            <GeneralSettings
              settings={settings}
              handleTemperatureSelect={(format) => handleSelect("selectedTemperature", format)}
              handleDateFormatSelect={(format) => handleSelect("selectedDateFormat", format)}
              handleTimeFormatSelect={(format) => handleSelect("selectedTimeFormat", format)}
              handleTimezoneSelect={(format) => handleSelect("selectedTimezone", format)}
              handleAutoRefreshSelect={(format) => handleSelect("selecedAutoRefresh", format)}
            />
          )}
          {settings.option === "options" && (
            <div>
              <SettingsOptions
                settings={settings}
                handleThemeSelect={(value) => handleSelect("selectedTheme", value)}
                handleFontSizeSelect={(value) => handleSelect("selectedFontSize", value)}
                handleNavigationDateVisibilitySelect={(value) => handleSelect("selectedNavigationDateVisibility", value)}
              />
            </div>
          )}
          {settings.option === "notification" && <div>notification</div>}
          {settings.option === "privacy" && <div>privacy</div>}
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
