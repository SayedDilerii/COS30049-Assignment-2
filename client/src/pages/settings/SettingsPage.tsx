import GeneralSettings from "@/components/settings/SettingsGeneral";
import SettingsNotifications from "@/components/settings/SettingsNotification";
import SettingsOptions from "@/components/settings/SettingsOptions";
import SettingsPrivacy from "@/components/settings/SettingsPrivacy";
import SettingsSidePanel from "@/components/settings/SettingsSidePanel";
import Container from "@/components/ui/container";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    option: "general",
  });
  const [mobileSettings, setMobileSettings] = useState({
    option: "menu",
  });

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isDesktop = useMediaQuery("(min-width: 1200px)");

  const handleSelect = (key: string, value: string) => {
    if (key !== "option") return; // Ensures the key is always "option"

    if (isMobile) {
      setMobileSettings({ option: value });
    } else {
      setSettings({ option: value });
    }
  };

  const handleReturnToSettings = () => {
    setMobileSettings({ option: "menu" }); // Return to main settings view
  };

  const renderContent = () => {
    switch (settings.option) {
      case "general":
        return <GeneralSettings />;
      case "options":
        return <SettingsOptions />;
      case "notification":
        return <SettingsNotifications />;
      case "privacy":
        return <SettingsPrivacy />;
      default:
        return <GeneralSettings />; // Provide a sensible default
    }
  };

  const renderMobileContent = () => {
    const returnButton = (
      <button onClick={handleReturnToSettings} className="bg-zinc-400 text-white px-2 py-2 rounded-full">
        Return to Settings
      </button>
    );

    switch (mobileSettings.option) {
      case "general":
        return (
          <div className="px-2">
            <div className="flex items-center justify-between pt-4">
              <h1 className="text-2xl font-medium text-zinc-500">General</h1>
              {returnButton}
            </div>
            <div className="border-b-2 border-zinc-200 py-4"></div>
            <GeneralSettings />
          </div>
        );
      case "options":
        return (
          <div className="px-2">
            <div className="flex items-center justify-between pt-4">
              <h1 className="text-2xl font-medium text-zinc-500">Options</h1>
              {returnButton}
            </div>
            <div className="border-b-2 border-zinc-200 pt-4"></div>
            <SettingsOptions />
          </div>
        );
      case "notification":
        return (
          <div className="px-2">
            <div className="flex items-center justify-between pt-4">
              <h1 className="text-2xl font-medium text-zinc-500">Notifications</h1>
              {returnButton}
            </div>
            <div className="border-b-2 border-zinc-200 pt-4"></div>
            <SettingsNotifications />
          </div>
        );
      case "privacy":
        return (
          <div className="px-2">
            <div className="flex items-center justify-between pt-4">
              <h1 className="text-2xl font-medium text-zinc-500">Privacy</h1>
              {returnButton}
            </div>
            <div className="border-b-2 border-zinc-200 pt-4"></div>
            <SettingsPrivacy />
          </div>
        );
      default:
        return <SettingsSidePanel callback={handleSelect} currentOption={settings.option} />;
    }
  };

  return (
    <Container>
      <div className="flex h-full">
        {isMobile ? (
          <div className="w-full px-4">{renderMobileContent()}</div>
        ) : (
          <>
            <div className={isDesktop ? "ml-24" : ""}>
              <SettingsSidePanel callback={handleSelect} currentOption={settings.option} />
            </div>
            <div className="border-l w-full px-8 mt-24 flex-col">{renderContent()}</div>
          </>
        )}
      </div>
    </Container>
  );
};

export default SettingsPage;
