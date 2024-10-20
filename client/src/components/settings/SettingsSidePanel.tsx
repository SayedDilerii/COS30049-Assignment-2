import { Button } from "../ui/button";

interface IProps {
  callback: (optionsValue: string) => void;
  currentOption: string;
}

const SettingsSidePanel: React.FC<IProps> = ({ callback, currentOption }) => {
  const buttonStylesActive: string = "bg-emerald-100 text-emerald-600";

  return (
    <div className="flex flex-col h-full px-12 pt-24">
      <div className="flex flex-col gap-24">
        <h1 className="text-3xl font-medium text-zinc-500">Settings</h1>
        <div className="flex flex-col gap-1">
          <Button
            variant={"ghost"}
            className={`${
              currentOption === "general" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start py-6 pr-24 hover:bg-emerald-100`}
            onClick={() => callback("general")}
          >
            General
          </Button>
          <Button
            variant={"ghost"}
            className={`${
              currentOption === "options" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start py-6 pr-24 hover:bg-emerald-100`}
            onClick={() => callback("options")}
          >
            Options
          </Button>
          <Button
            variant={"ghost"}
            className={`${
              currentOption === "notification" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start py-6 pr-24 hover:bg-emerald-100`}
            onClick={() => callback("notification")}
          >
            Notifications
          </Button>
          <Button
            variant={"ghost"}
            className={`${
              currentOption === "privacy" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start py-6 pr-24 hover:bg-emerald-100`}
            onClick={() => callback("privacy")}
          >
            Privacy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidePanel;
