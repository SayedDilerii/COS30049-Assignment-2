import { AlertCircle, GroupIcon, HelpCircleIcon, Menu, Settings, Sun, ThumbsUp } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
import NotificationPopover from "./notification-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const Navbar: React.FC = () => {
  const url = useLocation();
  const isOnboardingPage = url.pathname === "/onboarding";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className={`h-[72px] sm:h-[64px] flex items-center justify-between gap-2 ${!isOnboardingPage ? "px-4" : "px-6 sm:px-12"} bg-[#106B40]`}>
      <div className="flex items-center gap-2">
        <Sun className="text-emerald-100" size={22} />
        <Link to={isOnboardingPage ? "/onboarding" : "/dashboard"} className="text-[1em] text-emerald-100 cursor-pointer" title="FireGuard Logo - Stay safe, stay aware.">
          FireGuard
        </Link>
        {!isOnboardingPage && (
          <Button className="bg-emerald-600/60 font-light text-[15px] cursor-default ml-6 hidden sm:block" title="Today's date">
            Today is {today}
          </Button>
        )}
      </div>
      {!isOnboardingPage && (
        <div className="flex items-center gap-4">
          <NotificationPopover />
          {/* Settings dropdown */}
          <Popover open={isOpen} onOpenChange={() => setIsOpen((state) => !state)}>
            <PopoverTrigger asChild>
              <Button className={`flex gap-2 items-center bg-transparent rounded-lg px-3 ${isOpen && "bg-zinc-400/30"}`}>
                <Menu size={20} className="text-zinc-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex justify-center sm:block border-[0.5px] border-zinc-600 w-[300px] sm:w-[200px] shadow-lg rounded-xl p-2 bg-zinc-700" align="end">
              <div className="sm:hidden text-[12px] border-r border-zinc-600 flex flex-col justify-between p-2 w-[130px] mr-2">
                <div>
                  <p className="text-zinc-400 font-light">Today is</p>
                  <p className="text-zinc-100">{today}</p>
                </div>
                <div>
                  <span className="text-zinc-400 font-light">
                    “Stay safe, <br /> stay alert”
                  </span>
                </div>
              </div>
              <div>
                <Link
                  to={"/report"}
                  onClick={() => setIsOpen((state) => !state)}
                  className="w-full flex justify-start items-center gap-3 text-red-400 text-[15px] rounded-md hover:bg-zinc-600 hover:text-red h-10 px-3"
                >
                  <AlertCircle size={18} className="text-red-400" />
                  Report
                </Link>
                <Link
                  to={"/settings"}
                  onClick={() => setIsOpen((state) => !state)}
                  className="w-full flex justify-start items-center gap-3 text-white text-[15px] rounded-md hover:bg-zinc-600 hover:text-white h-10 px-3"
                >
                  <Settings size={18} className="text-zinc-400" />
                  Settings
                </Link>
                <Link
                  to={"/help-page"}
                  onClick={() => setIsOpen((state) => !state)}
                  className="w-full flex justify-start items-center gap-3 text-white text-[15px] rounded-md hover:bg-zinc-600 hover:text-white h-10 px-3"
                >
                  <HelpCircleIcon size={18} className="text-zinc-400" />
                  Help Center
                </Link>
                <div className="h-[1px] bg-zinc-600 w-full my-2"></div>
                <Link
                  to={"/feedback"}
                  onClick={() => setIsOpen((state) => !state)}
                  className="w-full flex justify-start items-center gap-3 text-[15px] rounded-md text-zinc-400 hover:bg-zinc-600 hover:text-white h-10 px-3"
                >
                  <ThumbsUp size={18} className="text-zinc-400" />
                  Feedback
                </Link>
                <Link
                  to={"/about-us"}
                  onClick={() => setIsOpen((state) => !state)}
                  className="w-full flex justify-start items-center gap-3 text-[15px] rounded-md text-zinc-400 hover:bg-zinc-600 hover:text-white h-10 px-3"
                >
                  <GroupIcon size={18} className="text-zinc-400" />
                  About us
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

// const MemoizedNavbar = React.memo(Navbar);
// MemoizedNavbar.displayName = "MemoizedNavbar";

export default Navbar;
