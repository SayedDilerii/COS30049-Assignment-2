import Container from "@/components/ui/container";
import { DashboardContext } from "@/providers/DashboardProvider";
import { useContext } from "react";

const DrawerBody: React.FC = () => {
  const dashboardContext = useContext(DashboardContext);
  const data = dashboardContext?.data && { ...dashboardContext?.data };
  console.log("BODY CONSUMER - DATA: ", dashboardContext?.data);

  return <Container className="px-8 h-full overflow-y-scroll border-t border-b">{data?.result.current_prediction.risk_score}</Container>;
};

export default DrawerBody;
