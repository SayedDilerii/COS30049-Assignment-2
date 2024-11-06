import Drawer from "@/components/dashboard/drawer/Drawer";
import DrawerBody from "@/components/dashboard/drawer/DrawerBody";
import DrawerHeader from "@/components/dashboard/drawer/DrawerHeader";
import GoogleMaps from "@/components/dashboard/google-maps/GoogleMaps";
import Container from "@/components/ui/container";
import { states } from "@/constants/states";
import { calculateRiskColour, riskScoreAlias } from "@/lib/utils";
import { useDashboard } from "@/providers/DashboardProvider";
import { StateName } from "@/types/maps.type";
import { ModelResult } from "@/types/model.type";
import { GripHorizontal } from "lucide-react";
import { useEffect, useRef } from "react";
import { ImperativePanelGroupHandle, Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const Dashboard: React.FC = () => {
  const ref = useRef<ImperativePanelGroupHandle>(null);
  const dashboardContext = useDashboard();
  const isDataPresent = dashboardContext.data;
  const data = useRef<ModelResult | null>(null);

  const convertToStateName = (input: string): string => {
    let stateName = "";
    states.forEach((state) => {
      if (state.abbreviation === input) {
        stateName = state.name;
      }
    });
    return stateName;
  };

  useEffect(() => {
    const panelGroup = ref.current;
    if (panelGroup && isDataPresent) {
      panelGroup.setLayout([35, 65]);
    }

    if (isDataPresent) {
      data.current = dashboardContext.data;
    }
  }, [isDataPresent, dashboardContext]);

  const stateName = convertToStateName(data.current?.result?.current_prediction?.state);
  return (
    <>
      <Container className="h-full relative overflow-auto">
        <PanelGroup direction="vertical" ref={ref}>
          <Panel maxSize={50} defaultSize={30} className="bg-zinc-200 h-1/2 transition-all duration-500 ease-in-out">
            <GoogleMaps
              highlightColor={calculateRiskColour(riskScoreAlias(dashboardContext.data ? dashboardContext.data.result!.current_prediction!.risk_score : 0)).colour}
              selectedState={stateName as StateName}
            />
          </Panel>
          <PanelResizeHandle>
            <div className="z-10 flex h-4  items-center justify-center rounded-sm border bg-zinc-200">
              <GripHorizontal className="h-3.5 w-3.5" color="black" />
            </div>
          </PanelResizeHandle>
          <Panel maxSize={75} defaultSize={70} className="w-full h-1/2 transition-all duration-500 ease-in-out">
            <Drawer header={<DrawerHeader />} body={<DrawerBody />} />
          </Panel>
        </PanelGroup>
      </Container>
    </>
  );
};

export default Dashboard;
