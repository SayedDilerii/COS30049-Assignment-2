import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Loader from "@/components/ui/loader";
import { DashboardContext } from "@/providers/DashboardProvider";
import { useContext } from "react";

type RiskOverview = {
  risk_score?: number;
  high_risk_days?: string[];
  state?: string;
};

const HighRiskDatesBadge = ({ date }: { date: string }) => {
  return <span className="py-1 px-4 bg-zinc-200/80 rounded-md cursor-default">{date}</span>;
};

const RiskOverview: React.FC<RiskOverview> = ({ risk_score, high_risk_days, state }) => {
  return (
    <section className="grid gap-6 py-6 px-8">
      <div>
        <p className="text-xl font-medium tracking-tight text-slate-700">Risk overview</p>
      </div>
      <div className="flex gap-24">
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 font-normal tracking-tight">Overall Predicted risk levels</p>
          <span className="py-1 px-4 bg-orange-200 text-orange-700 w-fit rounded-md">Moderate Risk</span>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-zinc-500 font-normal tracking-tight">High risk dates</p>
          <div className="flex gap-4">
            <HighRiskDatesBadge date="September 19, 2024" />
            <HighRiskDatesBadge date="September 24, 2024" />
            <HighRiskDatesBadge date="September 27, 2024" />
            <HighRiskDatesBadge date="October 02, 2024" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Visualisation: React.FC = () => {
  return (
    <section className="grid gap-6 pt-6 px-8">
      <div>
        <p className="text-xl font-medium tracking-tight text-slate-700">Visualisation</p>
      </div>
      <div className="flex gap-24"></div>
    </section>
  );
};

const DrawerBody: React.FC = () => {
  const dashboardContext = useContext(DashboardContext);
  const data = dashboardContext?.data;

  const isLoading = dashboardContext?.isLoading || dashboardContext?.isFetching;
  const hasError = dashboardContext?.isError;
  const hasData = !!dashboardContext?.data;

  const renderQueryResult = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <div>
            <Loader message="Querying the AI..." />
          </div>
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-center grid gap-2">
            <p className="text-2xl font-medium text-slate-700">Something went wrong</p>
            <p className="text-slate-500">We're sorry about this inconvenience.</p>
            <Button variant={"destructive"}>Reload</Button>
          </div>
        </div>
      );
    }

    if (!hasData) {
      return (
        <div className="flex justify-center items-center w-full h-full">
          <div className="text-center grid gap-2">
            <p className="text-2xl font-medium text-slate-700">Currently, nothing to show.</p>
            <p className="text-slate-500">This area is dedicated to show the search results.</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <RiskOverview />
        <hr />
        <Visualisation />
        <pre>{JSON.stringify(data?.result.current_prediction ?? "NON").toString()}</pre>
        <pre>{JSON.stringify(data?.result.feature_importance ?? "").toString()}</pre>
        <pre>{JSON.stringify(data?.result.historical_context ?? "").toString()}</pre>
        <pre>{JSON.stringify(data?.result.seasonal_risk ?? "").toString()}</pre>
        <pre>{JSON.stringify(data?.result.state_comparison ?? "").toString()}</pre>
        <pre>{JSON.stringify(data?.result.temperature_risk_curve ?? "").toString()}</pre>
      </>
    );
  };

  return <Container className="h-full overflow-y-scroll border-t border-b w-full">{renderQueryResult()}</Container>;
};

export default DrawerBody;
