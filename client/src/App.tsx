import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Container from "./components/ui/container";
import MemoizedNavbar from "./components/ui/navbar";

const App: React.FC = () => {
  return (
    <>
      <Container className="flex flex-col flex-1" style={{ height: "100dvh" }}>
        <MemoizedNavbar />
        <Container className="h-full overflow-y-scroll overflow-x-hidden">
          <Outlet />
          <Toaster visibleToasts={4} expand />
        </Container>
      </Container>
    </>
  );
};

export default App;
