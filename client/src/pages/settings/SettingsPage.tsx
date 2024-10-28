import GeneralSettings from "@/components/settings/SettingsGeneral";
import SettingsNotifications from "@/components/settings/SettingsNotification";
import SettingsOptions from "@/components/settings/SettingsOptions";
import SettingsPrivacy from "@/components/settings/SettingsPrivacy";
import SettingsSidePanel from "@/components/settings/SettingsSidePanel";
import Container from "@/components/ui/container";
import { useState } from "react";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    option: "general",
  });

  const handleSelect = (key: string, value: string) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: value,
    }));
  };

  return (
    <Container>
      <div className="flex h-full">
        <div className="ml-24">
          <SettingsSidePanel callback={(key, value) => handleSelect(key, value)} currentOption={settings.option} />
        </div>
        <div className="border-l w-full px-8 mt-24 flex-col">
          {settings.option === "general" && <GeneralSettings />}
          {settings.option === "options" && <SettingsOptions />}
          {settings.option === "notification" && <SettingsNotifications />}
          {settings.option === "privacy" && <SettingsPrivacy />}
        </div>
      </div>
    </Container>
  );
};

export default SettingsPage;
