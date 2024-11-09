import { get } from "@/lib/api";
import { ReportPayload } from "@/types/report.type";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import Loader from "./loader";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type ReportResponse = {
  status: boolean;
  results: ReportPayload[];
};

const NotificationPopover: React.FC = () => {
  const navigate = useNavigate();

  const queryReports = useQuery({
    queryKey: ["/report"],
    queryFn: (context) => get<ReportResponse>(context.queryKey.toString()),
    staleTime: Infinity,
    retry: 1,
  });

  const notifications = queryReports.data;
  const isLoading = queryReports.isLoading || queryReports.isFetching;

  const renderNotifications = () => {
    if (queryReports.error) {
      return (
        <div className="h-full grid place-items-center">
          <div className="flex flex-col gap-4">
            Something went wrong, please try again!
            <Button onClick={() => queryReports.refetch()} variant={"destructive"}>
              Reload
            </Button>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="h-full grid place-items-center">
          <div>
            <Loader message="Fetching notifications..." />
          </div>
        </div>
      );
    }

    if (queryReports.data) {
      return (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <p className="text-lg sm:text-[1.5em] font-medium">Updates and Alerts</p>
            <Button variant={"destructive"} className="flex gap-2" onClick={() => navigate("/report")}>
              <AlertCircle size={18} />
              Report
            </Button>
          </div>

          <div className="flex flex-col gap-6">
            {notifications?.results?.map((report) => (
              <div className="border-l-4 border-l-orange-400 pl-4 py-2 flex flex-col gap-1 hover:bg-orange-50 cursor-default" key={report.id}>
                <p className="font-bold">
                  State: {report.state} - {report.nearest_town}
                </p>
                <p>Reporter: {report.full_name}</p>
                <p>Cause: {report.cause}</p>
                <p>Severity: {report.severity}</p>
                <p>
                  Datetime: {report.discovery_date} - {report.discovery_time}
                </p>
                <p>Evacuation status: {report.evacuation_status}</p>
                <p>Incident Status: {report.status}</p>
                <p>Fire estimated size: {report.estimated_size}</p>
                <p>Description: {report.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex gap-2 items-center font-normal bg-emerald-600/70">
          {isLoading ? (
            <Loader message="fetching..." />
          ) : (
            <>
              <Bell size={16} className="text-emerald-100" />
              <span className="hidden sm:block">{notifications?.results.length} Notifications</span>
              <span className="sm:hidden">{notifications?.results.length}</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-[0.5px] border-zinc-400 w-[310px] sm:w-[500px] mt-1 shadow-lg rounded-xl h-[370px] sm:h-[500px] bg-white p-6 overflow-y-scroll" align="end">
        {renderNotifications()}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
