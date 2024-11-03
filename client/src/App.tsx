import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Container from "./components/ui/container";
import Navbar from "./components/ui/navbar";
import { NavigationProvider } from "./providers/NavigationProvider";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationProvider>
          <Container className="flex flex-col flex-1" style={{ height: "100dvh" }}>
            <Navbar />
            <Container className="h-full overflow-y-scroll overflow-x-hidden">
              <Outlet />
              <Toaster visibleToasts={4} expand />
            </Container>
          </Container>
        </NavigationProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
