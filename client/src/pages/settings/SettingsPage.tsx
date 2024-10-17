import { Button } from "@/components/ui/button";

const SettingsPage: React.FC = () => {
  const buttonStyles: string =
    "flex-auto hover:bg-emerald-100 font-normal hover:text-emerald-700 hover:font-semibold rounded-md";
  return (
    <>
      <div className="flex flex-col w-fit gap-24">
        <h1 className="text-3xl font-medium text-zinc-500">Settings</h1>
        <div className="flex flex-col gap-1">
          <Button variant={"ghost"} className={buttonStyles}>
            General
          </Button>
          <Button variant={"ghost"} className={buttonStyles}>
            Options
          </Button>
          <Button variant={"ghost"} className={buttonStyles}>
            Notifications
          </Button>
          <Button variant={"ghost"} className={buttonStyles}>
            Privacy
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
