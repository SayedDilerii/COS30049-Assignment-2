import { Outlet } from "react-router-dom";
import "./App.css";
import Container from "./components/layout/Container";
import MemoizedNavbar from "./components/navbar";

const App: React.FC = () => {
  return (
    <>
      <Container className="h-screen flex flex-col flex-1">
        <MemoizedNavbar />
        <Container className="h-full overflow-y-scroll overflow-x-hidden bg-emerald-200/60">
          <Outlet />
        </Container>
      </Container>
    </>
  );
};

export default App;
