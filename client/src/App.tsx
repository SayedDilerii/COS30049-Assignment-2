import { Outlet } from "react-router-dom";
import Container from "./components/ui/container";
import MemoizedNavbar from "./components/ui/navbar";

const App: React.FC = () => {
  return (
    <>
      <Container className="h-screen flex flex-col flex-1">
        <MemoizedNavbar />
        <Container className="h-full overflow-y-scroll overflow-x-hidden bg-emerald-200/10">
          <Outlet />
        </Container>
      </Container>
    </>
  );
};

export default App;
