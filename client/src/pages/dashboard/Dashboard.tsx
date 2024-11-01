import Drawer from "@/components/dashboard/drawer/Drawer";
import DrawerBody from "@/components/dashboard/drawer/DrawerBody";
import DrawerFooter from "@/components/dashboard/drawer/DrawerFooter";
import DrawerHeader from "@/components/dashboard/drawer/DrawerHeader";
import GoogleMaps from "@/components/dashboard/google-maps/GoogleMaps";
import Container from "@/components/ui/container";
import { DashboardProvider } from "@/providers/DashboardProvider";

const Dashboard: React.FC = () => {
  return (
    <>
      <Container className="h-full relative overflow-auto">
        <Container className="bg-zinc-200 h-1/2">
          <GoogleMaps />
        </Container>
        <Container className="w-full h-1/2">
          <DashboardProvider>
            <Drawer header={<DrawerHeader />} body={<DrawerBody />} footer={<DrawerFooter />} />
          </DashboardProvider>
        </Container>
      </Container>
    </>
  );
};

export default Dashboard;
