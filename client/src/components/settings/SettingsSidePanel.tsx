import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface IProps {
  callback: (key: string, value: string) => void;
  currentOption: string;
}

const SettingsSidePanel: React.FC<IProps> = ({ callback, currentOption }) => {
  const buttonStylesActive = "bg-emerald-100 text-emerald-600";
  const isMobile = useMediaQuery("(max-width: 700px)");
  const navigate = useNavigate();

  return (
    <div className={isMobile ? "pt-10" : "flex flex-col h-full px-12 pt-24"}>
      <div className={isMobile ? "flex flex-col gap-8" : "flex flex-col gap-24"}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl text-zinc-600">Settings</h1>
          {isMobile && (
            <Button onClick={() => navigate("/dashboard")} className="tracking-tight">
              Go to Dashboard
            </Button>
          )}
        </div>
        {isMobile && (
          <>
            <hr />
          </>
        )}
        <div className={isMobile ? "flex flex-col gap-4" : "flex flex-col gap-1"}>
          <Button
            variant="ghost"
            className={`${
              currentOption === "general" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start sm:py-6 sm:pr-24 hover:bg-emerald-100`}
            onClick={() => callback("option", "general")}
          >
            General
          </Button>
          <Button
            variant="ghost"
            className={`${
              currentOption === "options" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start sm:py-6 sm:pr-24 hover:bg-emerald-100`}
            onClick={() => callback("option", "options")}
          >
            Options
          </Button>
          <Button
            variant="ghost"
            className={`${
              currentOption === "notification" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start sm:py-6 sm:pr-24 hover:bg-emerald-100`}
            onClick={() => callback("option", "notification")}
          >
            Notifications
          </Button>
          <Button
            variant="ghost"
            className={`${
              currentOption === "privacy" && buttonStylesActive
            } text-[16px] text-start hover:text-emerald-700 rounded-lg justify-start sm:py-6 sm:pr-24 hover:bg-emerald-100`}
            onClick={() => callback("option", "privacy")}
          >
            Privacy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidePanel;
