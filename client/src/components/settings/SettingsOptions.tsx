import PropertySelector from "@/components/settings/SettingsPropertySelector";

interface OptionsSettingsProps {
  settings: {
    selectedTheme: string;
    selectedFontSize: string;
    selectedNavigationDateVisibility: string;
  };
  // Callbacks
  handleThemeSelect: (format: string) => void;
  handleFontSizeSelect: (format: string) => void;
  handleNavigationDateVisibilitySelect: (format: string) => void;
}

const SettingsOptions: React.FC<OptionsSettingsProps> = ({ settings, handleThemeSelect, handleFontSizeSelect, handleNavigationDateVisibilitySelect }) => {
  const selectors = [
    {
      heading: "Theme",
      caption: "Select theme",
      triggerText: settings.selectedTheme,
      items: ["Light", "Dark", "System"],
      onSelect: handleThemeSelect,
    },
    {
      heading: "Font Size",
      caption: "Select font size",
      triggerText: settings.selectedFontSize,
      items: ["Small", "Medium", "Large"],
      onSelect: handleFontSizeSelect,
    },
    {
      heading: "Navigation Date Visibility",
      caption: "Set date visibility in navigation",
      triggerText: settings.selectedNavigationDateVisibility,
      items: ["Show", "Hide"],
      onSelect: handleNavigationDateVisibilitySelect,
    },
  ];

  return (
    <div>
      {selectors.map((selector, index) => (
        <div key={index} className="pt-4">
          <PropertySelector heading={selector.heading} caption={selector.caption} triggerText={selector.triggerText} items={selector.items} onSelect={selector.onSelect} />
        </div>
      ))}
    </div>
  );
};

export default SettingsOptions;
