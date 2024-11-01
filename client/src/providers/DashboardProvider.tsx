import { ModelResult } from "@/types/model.type";
import { createContext, useState } from "react";

interface DashboardProps {
  children: React.ReactNode;
}

interface ContextProps {
  data: ModelResult | null;
  setDataHandler: (data: ModelResult) => void;
}

const DashboardContext = createContext<ContextProps | null>(null);

const DashboardProvider: React.FC<DashboardProps> = ({ children }) => {
  const [data, setData] = useState<ModelResult | null>(null);

  const setDataHandler = (data: ModelResult) => {
    setData(data);
  };

  return <DashboardContext.Provider value={{ data, setDataHandler }}>{children}</DashboardContext.Provider>;
};

export { DashboardContext, DashboardProvider };
