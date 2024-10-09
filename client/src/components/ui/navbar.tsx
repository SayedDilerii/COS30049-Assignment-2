import { Bell, GroupIcon, HelpCircleIcon, Menu, Settings, Sun, ThumbsUp, TriangleAlert } from "lucide-react";
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

  const notifications = [
    {
      urgency: "HIGH",
      location: "California",
      datetime: "2024-04-03",
      color: "rose-500",
    },
    {
      urgency: "MODERATE",
      location: "California",
      datetime: "2024-04-03",
      color: "orange-500",
    },
    {
      urgency: "VERY HIGH",
      location: "Arizona",
      datetime: "2024-04-03",
      color: "rose-500",
    },
    {
      urgency: "LOW",
      location: "Texax",
      datetime: "2024-04-03",
      color: "green-500",
    },
    {
      urgency: "LOW",
      location: "Washington",
      datetime: "2024-04-03",
      color: "green-500",
    },
    {
      urgency: "HIGH",
      location: "California",
      datetime: "2024-04-03",
      color: "rose-500",
    },
    {
      urgency: "MODERATE",
      location: "California",
      datetime: "2024-04-03",
      color: "orange-500",
    },
    {
      urgency: "VERY HIGH",
      location: "Arizona",
      datetime: "2024-04-03",
      color: "rose-500",
    },
    {
      urgency: "LOW",
      location: "Texax",
      datetime: "2024-04-03",
      color: "green-500",
    },
    {
      urgency: "LOW",
      location: "Washington",
      datetime: "2024-04-03",
      color: "green-500",
    },
  ];

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
              className="border-[0.5px] border-zinc-400 w-[500px] mt-1 shadow-lg rounded-xl h-[500px] bg-white p-6 overflow-y-scroll"
              align="end"
            >
              <div className="flex gap-4">
                <TriangleAlert size={32} className="text-orange-800" />
                <p className="text-[1.5em] font-medium">Updates and Alerts</p>
              </div>
              <table className="w-full mt-6">
                <tr className="w-full">
                  <th className="font-light text-zinc-400 w-[150px] text-start tracking-tight">Urgency</th>
                  <th className="font-light text-zinc-400 text-start w-[150px] tracking-tight">Location</th>
                  <th className="font-light text-zinc-400 text-start tracking-tight">Datetime</th>
                </tr>
                {notifications.map((item) => (
                  <tr className="w-full">
                    <td className={`font-medium w-[150px] py-2 text-${item.color} tracking-tight`}>{item.urgency}</td>
                    <td className="font-normal w-[150px] py-2">{item.location}</td>
                    <td className="font-normal py-2">{item.datetime}</td>
                  </tr>
                ))}
              </table>
            </PopoverContent>
          </Popover>

          {/* Settings dropdown */}
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex gap-2 items-center bg-transparent rounded-lg px-3">
                <Menu size={20} className="text-emerald-100" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-[0.5px] border-zinc-400 w-[200px] shadow-lg rounded-xl p-2 bg-zinc-700" align="end">
              <Button
                variant={"ghost"}
                className="w-full flex justify-start gap-3 text-white text-[15px] rounded-md hover:bg-zinc-600 hover:text-white h-10 px-3"
              >
                <Settings size={18} className="text-zinc-400" />
                Settings
              </Button>
              <Button
                variant={"ghost"}
                className="w-full flex justify-start gap-3 text-white text-[15px] rounded-md hover:bg-zinc-600 hover:text-white h-10 px-3"
              >
                <HelpCircleIcon size={18} className="text-zinc-400" />
                Help Center
              </Button>
              <div className="h-[1px] bg-zinc-600 w-full my-2"></div>
              <Button
                variant={"ghost"}
                className="w-full flex justify-start gap-3 text-[15px] rounded-md text-zinc-400 hover:bg-zinc-600 hover:text-white h-10 px-3"
              >
                <ThumbsUp size={18} className="text-zinc-400" />
                Feedback
              </Button>
              <Button
                variant={"ghost"}
                className="w-full flex justify-start gap-3 text-[15px] rounded-md text-zinc-400 hover:bg-zinc-600 hover:text-white h-10 px-3"
              >
                <GroupIcon size={18} className="text-zinc-400" />
                About us
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
