import GeneralSettings from "@/components/settings/SettingsGeneral";
import SettingsNotifications from "@/components/settings/SettingsNotification";
import SettingsOptions from "@/components/settings/SettingsOptions";
import SettingsPrivacy from "@/components/settings/SettingsPrivacy";
import SettingsSidePanel from "@/components/settings/SettingsSidePanel";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { NavigationContext } from "@/providers/NavigationProvider";
import { useContext, useEffect, useState } from "react";

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    option: "general",
  });
  const [mobileSettings, setMobileSettings] = useState({
    option: "menu",
  });

  const navbarContext = useContext(NavigationContext);

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

  useEffect(() => {
    if (isMobile) {
      navbarContext?.setMobileViewHandler(true);
    } else {
      navbarContext?.setMobileViewHandler(false);
    }
  }, [isMobile, navbarContext]);

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
      <Button onClick={handleReturnToSettings} className="tracking-tight">
        Return to Settings
      </Button>
    );

    switch (mobileSettings.option) {
      case "general":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pt-10">
              <h1 className="text-2xl text-zinc-600">General</h1>
              {returnButton}
            </div>
            <hr />
            <GeneralSettings />
          </div>
        );
      case "options":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pt-10">
              <h1 className="text-2xl text-zinc-600">Options</h1>
              {returnButton}
            </div>
            <hr />
            <SettingsOptions />
          </div>
        );
      case "notification":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pt-10">
              <h1 className="text-2xl text-zinc-600">Notifications</h1>
              {returnButton}
            </div>
            <hr />
            <SettingsNotifications />
          </div>
        );
      case "privacy":
        return (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pt-10">
              <h1 className="text-2xl text-zinc-600">Privacy</h1>
              {returnButton}
            </div>
            <hr />
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
