import { Button } from "../ui/button";

interface IProps {
  callback: (optionsValue: string) => void;
  currentOption: string;
}

const SettingsSidePanel: React.FC<IProps> = ({ callback, currentOption }) => {
  const buttonStylesPassive: string =
    "hover:bg-emerald-100 font-normal text-start hover:text-emerald-700 rounded-md justify-start";

  const buttonStylesActive: string =
    "bg-emerald-100 font-normal text-start text-emerald-700 rounded-md justify-start";

  return (
    <div className="flex flex-col h-full px-12 pt-24">
      <div className="flex flex-col gap-24">
        <h1 className="text-3xl font-medium text-zinc-500">Settings</h1>
        <div className="flex flex-col gap-1">
          <Button
            variant={"ghost"}
            className={
              currentOption === "general"
                ? buttonStylesActive
                : buttonStylesPassive
            }
            onClick={() => callback("general")}
          >
            General
          </Button>
          <Button
            variant={"ghost"}
            className={
              currentOption === "options"
                ? buttonStylesActive
                : buttonStylesPassive
            }
            onClick={() => callback("options")}
          >
            Options
          </Button>
          <Button
            variant={"ghost"}
            className={
              currentOption === "notification"
                ? buttonStylesActive
                : buttonStylesPassive
            }
            onClick={() => callback("notification")}
          >
            Notifications
          </Button>
          <Button
            variant={"ghost"}
            className={
              currentOption === "privacy"
                ? buttonStylesActive
                : buttonStylesPassive
            }
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
