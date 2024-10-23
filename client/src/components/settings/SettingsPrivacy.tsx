interface PrivacySettingsProps {
  settings: {
    selectedLocationPermissions: string;
  };
  handleLocationPermissions: (format: string) => void;
}
const SettingsPrivacy: React.FC<PrivacySettingsProps> = ({settings,handleLocationPermissions}) => {
  const selectors = [
    {
      heading: "Theme",
      caption: "Select theme",
      triggerText: settings.selectedLocationPermissions,
      items: ["Light", "Dark", "System"],
      onSelect: handleLocationPermissions,
    }
  ]

  return ()
}