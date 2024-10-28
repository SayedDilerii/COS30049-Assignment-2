import { Bell, GroupIcon, HelpCircleIcon, Menu, Settings, Sun, ThumbsUp, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";
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

  const notifications = [
    {
      urgency: "HIGH",
      location: "California",
      datetime: "2024-04-03",
      color: "text-rose-500",
    },
    {
      urgency: "MODERATE",
      location: "California",
      datetime: "2024-04-03",
      color: "text-orange-500",
    },
    {
      urgency: "VERY HIGH",
      location: "Arizona",
      datetime: "2024-04-03",
      color: "text-rose-500",
    },
    {
      urgency: "LOW",
      location: "Texax",
      datetime: "2024-04-03",
      color: "text-green-500",
    },
    {
      urgency: "LOW",
      location: "Washington",
      datetime: "2024-04-03",
      color: "text-green-500",
    },
    {
      urgency: "HIGH",
      location: "California",
      datetime: "2024-04-03",
      color: "text-rose-500",
    },
    {
      urgency: "MODERATE",
      location: "California",
      datetime: "2024-04-03",
      color: "text-orange-500",
    },
    {
      urgency: "VERY HIGH",
      location: "Arizona",
      datetime: "2024-04-03",
      color: "text-rose-500",
    },
    {
      urgency: "LOW",
      location: "Texax",
      datetime: "2024-04-03",
      color: "text-green-500",
    },
    {
      urgency: "LOW",
      location: "Washington",
      datetime: "2024-04-03",
      color: "text-green-500",
    },
  ];

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
          {/* Notifications dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex gap-2 items-center font-normal bg-emerald-600">
                <Bell size={16} className="text-emerald-100" />
                <span className="hidden sm:block">10 Notifications</span>
                <span className="sm:hidden">10</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="border-[0.5px] border-zinc-400 w-[310px] sm:w-[500px] mt-1 shadow-lg rounded-xl h-[370px] sm:h-[500px] bg-white p-6 overflow-y-scroll"
              align="end"
            >
              {/* Web View */}
              <div className="flex gap-2 sm:gap-4">
                <TriangleAlert className="text-orange-800 sm:h-[32px] sm:w-[32px]" />
                <p className="text-lg sm:text-[1.5em] font-medium">Updates and Alerts</p>
              </div>
              <table className="w-full mt-6 hidden sm:block">
                <tr className="w-full">
                  <th className="font-light text-zinc-400 w-[150px] text-start tracking-tight">Urgency</th>
                  <th className="font-light text-zinc-400 text-start w-[150px] tracking-tight">Location</th>
                  <th className="font-light text-zinc-400 text-start tracking-tight">Datetime</th>
                </tr>
                {notifications.map((item, idx) => (
                  <tr className="w-full" key={idx}>
                    <td className={`font-medium w-[150px] py-2 ${item.color} tracking-tight`}>{item.urgency}</td>
                    <td className="font-normal w-[150px] py-2">{item.location}</td>
                    <td className="font-normal py-2">{item.datetime}</td>
                  </tr>
                ))}
              </table>
              {/* Mobile view */}
              <div className="flex flex-col gap-3 h-[270px] overflow-y-scroll mt-4 sm:hidden ">
                {notifications.map((item, key) => (
                  <div className="flex flex-col gap-2 bg-zinc-100 rounded-md text-[14px] p-4 relative" key={key}>
                    <div>
                      <p className="text-zinc-400 font-light">Location</p>
                      <p>{item.location}</p>
                    </div>
                    <div className="flex gap-6">
                      <span>
                        <p className="text-zinc-400 font-light">Urgency</p>
                        <p>{item.urgency}</p>
                      </span>
                      <span>
                        <p className="text-zinc-400 font-light">Date</p>
                        <p>{item.datetime}</p>
                      </span>
                    </div>
                    <span className={`h-2 w-2 bg-red-900 rounded-full absolute right-4`}></span>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

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

const MemoizedNavbar = React.memo(Navbar);
MemoizedNavbar.displayName = "MemoizedNavbar";

export default MemoizedNavbar;
