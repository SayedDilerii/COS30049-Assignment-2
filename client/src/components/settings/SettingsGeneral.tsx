import PropertySelector from "@/components/settings/SettingsPropertySelector";

interface GeneralSettingsProps {
  settings: {
    selectedTemperature: string;
    selectedDateFormat: string;
    selectedTimeFormat: string;
    selectedTimezone: string;
    selecedAutoRefresh: string;
  };
  handleTemperatureSelect: (format: string) => void;
  handleDateFormatSelect: (format: string) => void;
  handleTimeFormatSelect: (format: string) => void;
  handleTimezoneSelect: (format: string) => void;
  handleAutoRefreshSelect: (format: string) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  settings,
  handleTemperatureSelect,
  handleDateFormatSelect,
  handleTimeFormatSelect,
  handleTimezoneSelect,
  handleAutoRefreshSelect,
}) => {
  return (
    <div>
      <div>
        <PropertySelector
          heading="Temperature"
          caption="Select temperature unit"
          triggerText={settings.selectedTemperature}
          items={["Celsius", "Fahrenheit"]}
          onSelect={handleTemperatureSelect}
        />
      </div>
      <div className="pt-4">
        <PropertySelector
          heading="Date format"
          caption="Select date format"
          triggerText={settings.selectedDateFormat}
          items={["YYYY-MM-DD", "DD-MM-YYYY"]}
          onSelect={handleDateFormatSelect}
        />
      </div>
      <div className="pt-4">
        <PropertySelector
          heading="Time format"
          caption="Select time format"
          triggerText={settings.selectedTimeFormat}
          items={["hh:mm:ss", "mm:hh:ss"]}
          onSelect={handleTimeFormatSelect}
        />
      </div>
      <div className="pt-4">
        <PropertySelector
          heading="Timezone"
          caption="Select timezone"
          triggerText={settings.selectedTimezone}
          items={["Melbourne/Australia"]}
          onSelect={handleTimezoneSelect}
        />
      </div>
      <div className="pt-4">
        <PropertySelector
          heading="Auto-refresh"
          caption="Set refresh interval"
          triggerText={settings.selecedAutoRefresh}
          items={["Every 2-Minutes", "Every 5-Minutes", "Every 10-Minutes"]}
          onSelect={handleAutoRefreshSelect}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
