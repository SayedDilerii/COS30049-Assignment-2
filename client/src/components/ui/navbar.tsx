import { Bell, Menu, Settings, Sun } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const Navbar: React.FC = () => {
  const url = useLocation();
  const isDashboard = url.pathname === "/dashboard";
  const isOnboarding = url.pathname === "/onboarding";

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <nav className={`h-[64px] flex items-center justify-between gap-2 py-6 ${isDashboard ? "px-6" : "px-12"} bg-[#106B40]`}>
      <div className="flex items-center">
        <Sun className="text-emerald-100" size={22} />
        <Link
          to={isOnboarding ? "/onboarding" : "/dashboard"}
          className="text-[1em] text-emerald-100 cursor-pointer"
          title="FireGuard Logo - Stay safe, stay aware."
        >
          FireGuard
        </Link>
        {isDashboard && (
          <Button className="bg-emerald-600/60 font-light text-[15px] cursor-default ml-6" title="Today's date">
            Today is {today}
          </Button>
        )}
      </div>
      {isDashboard && (
        <div className="flex items-center gap-4">
          {/* Notifications dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex gap-2 items-center font-normal bg-emerald-600">
                <Bell size={16} className="text-emerald-100" />
                Notifications
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="border-[0.5px] border-zinc-400 w-[500px] mt-1 shadow-lg rounded-xl h-[500px] bg-white"
              align="end"
            ></PopoverContent>
          </Popover>

          {/* Settings dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex gap-2 items-center bg-transparent rounded-lg px-3">
                <Menu size={20} className="text-emerald-100" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-[0.5px] border-zinc-400 w-[300px] shadow-lg rounded-xl h-[300px] bg-zinc-700" align="end">
              <Button
                variant={"ghost"}
                className="w-full flex justify-start gap-4 text-white text-[16px] rounded-md hover:bg-zinc-600 hover:text-white h-12"
              >
                <Settings size={16} className="text-zinc-300" />
                Settings
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </nav>
  );
};

const MemoizedNavbar = React.memo(Navbar);
MemoizedNavbar.displayName = "MemoizedNavbar";

export default MemoizedNavbar;
