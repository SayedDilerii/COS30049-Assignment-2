import Drawer from "@/components/dashboard/drawer/Drawer";
import DrawerBody from "@/components/dashboard/drawer/DrawerBody";
import DrawerFooter from "@/components/dashboard/drawer/DrawerFooter";
import DrawerHeader from "@/components/dashboard/drawer/DrawerHeader";
import Container from "@/components/ui/container";

const Dashboard: React.FC = () => {
  return (
    <>
      <Container className="h-full relative overflow-auto">
        <Container className="bg-zinc-200 h-1/2">
          <p>Google maps</p>
        </Container>
        <Container className="w-full h-1/2">
          <Drawer header={<DrawerHeader />} body={<DrawerBody />} footer={<DrawerFooter />} />
        </Container>
      </Container>
    </>
  );
};

export default Dashboard;
