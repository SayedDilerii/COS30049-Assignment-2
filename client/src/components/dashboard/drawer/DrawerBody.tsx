import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/ui/container";
import Loader from "@/components/ui/loader";
import { calculateRiskColour } from "@/lib/utils";
import { DashboardContext } from "@/providers/DashboardProvider";
import { useContext } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const DrawerBody: React.FC = () => {
  const dashboardContext = useContext(DashboardContext);
  const data = dashboardContext?.data;

  const isLoading = dashboardContext?.isLoading || dashboardContext?.isFetching;
  const hasError = dashboardContext?.isError;
  const hasData = !!dashboardContext?.data;

  const temperatureRiskData = data?.result.temperature_risk_curve;
  const seasonalRiskData = data?.result.seasonal_risk;
  const stateComparisonData = data?.result.state_comparison.slice(0, 15).sort((a, b) => b.avg_risk - a.avg_risk);

  // Conversion Utils
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatRisk = (value: any) => `${(value * 100).toFixed(1)}%`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTemp = (value: any) => `${value.toFixed(1)}°C`;

  const riskScoreAlias = (riskScore: number) => {
    let alias = "";
    if (+riskScore.toFixed(2) > 0.01 && +riskScore.toFixed(2) <= 0.25) {
      alias = "Low Risk";
    }

    if (+riskScore.toFixed(2) >= 0.26 && +riskScore.toFixed(2) <= 0.5) {
      alias = "Moderate Risk";
    }

    if (+riskScore.toFixed(2) >= 0.51 && +riskScore.toFixed(2) <= 0.75) {
      alias = "High Risk";
    }

    if (+riskScore.toFixed(2) >= 0.76 && +riskScore.toFixed(2) <= 0.99) {
      alias = "Extreme Risk";
    }

    return alias;
  };

  const risk = riskScoreAlias(0.05);
  console.log(risk);

  const me = calculateRiskColour(risk);
  console.log(me);

  const Visualisation: React.FC = () => {
    return (
      <section className="grid gap-6 pt-6 px-8">
        <div>
          <p className="text-2xl font-medium tracking-tight text-slate-700">Visualisation</p>
        </div>
        <div className="flex flex-col gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Temperature vs Risk Relationship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[25rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureRiskData} margin={{ left: 0, bottom: 16 }}>
                    <CartesianGrid strokeDasharray="2 2" fill="rgb(250,250,250)" />
                    <XAxis dataKey="temperature" label={{ value: "Temperature (°C)", position: "bottom", offset: 0 }} tickFormatter={formatTemp} tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={formatRisk} label={{ value: "Risk Score", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={formatRisk} labelFormatter={formatTemp} />
                    <Line type="monotone" dataKey="risk" stroke="#2563eb" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">Seasonal Risk Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[25rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonalRiskData}>
                    <CartesianGrid strokeDasharray="2 2" fill="rgb(250,250,250)" />
                    <XAxis
                      dataKey="discovery_month"
                      tickFormatter={(month) => {
                        const date = new Date(2024, month - 1);
                        return date.toLocaleString("default", { month: "short" });
                      }}
                      label={{ value: "Month", position: "bottom", offset: 0 }}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis yAxisId="left" tickFormatter={formatRisk} label={{ value: "Risk Score", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={["dataMin - 2", "dataMax + 2"]}
                      tickFormatter={formatTemp}
                      label={{ value: "Temperature (°C)", angle: 90, position: "insideRight" }}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "Risk Score") return formatRisk(value);
                        return formatTemp(value);
                      }}
                    />
                    <Legend verticalAlign="top" />
                    <Line yAxisId="left" type="monotone" dataKey="risk_score" name="Risk Score" stroke="#2563eb" strokeWidth={1.5} />
                    <Line yAxisId="right" type="monotone" dataKey="t_max" name="Max Temp" stroke="#dc2626" strokeWidth={1.5} />
                    <Line yAxisId="right" type="monotone" dataKey="t_min" name="Min Temp" stroke="#059669" strokeWidth={1.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-lg">State Risk Comparison (Top 15)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[25rem]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateComparisonData} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="2 2" fill="rgb(250,250,250)" />
                    <XAxis type="number" tickFormatter={formatRisk} domain={[0, "dataMax + 0.1"]} tick={{ fontSize: 12 }} />
                    <YAxis dataKey="state" type="category" width={20} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={formatRisk} />
                    <Bar dataKey="avg_risk" fill="#2563eb" name="Average Risk" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  };

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
        <section className="grid gap-6 py-6 px-8">
          <div>
            <p className="text-2xl font-medium tracking-tight text-slate-700">Risk overview</p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-zinc-500 font-normal tracking-tight">Overall Predicted risk level:</p>
              <span
                className="py-1 px-4 w-fit rounded-md"
                style={{
                  backgroundColor: calculateRiskColour(riskScoreAlias(data!.result!.current_prediction!.risk_score)).colour,
                  color: calculateRiskColour(riskScoreAlias(data!.result!.current_prediction!.risk_score)).fontColor,
                }}
              >
                {(data!.result!.current_prediction!.risk_score * 100).toFixed(2)}% - {riskScoreAlias(data!.result!.current_prediction!.risk_score)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-zinc-500 font-normal tracking-tight">Risk Colour Legened:</p>
              <div className="flex gap-2">
                <span className="py-1 px-4 bg-green-200 text-green-700 w-fit rounded-md">Low</span>
                <span className="py-1 px-4 bg-orange-200 text-orange-700 w-fit rounded-md">Moderate</span>
                <span className="py-1 px-4 bg-orange-500 text-white w-fit rounded-md">High</span>
                <span className="py-1 px-4 bg-red-800 text-white w-fit rounded-md">Extreme</span>
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="pb-8">
          <Visualisation />
        </section>
      </>
    );
  };

  return <Container className="h-full overflow-y-scroll border-t border-b w-full">{renderQueryResult()}</Container>;
};

export default DrawerBody;
