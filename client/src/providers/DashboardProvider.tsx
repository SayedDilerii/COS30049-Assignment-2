import { ModelResult } from "@/types/model.type";
import { createContext, useContext, useState } from "react";

interface DashboardProps {
  children: React.ReactNode;
}

interface ContextProps {
  data: ModelResult | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  setDataHandler: (data: ModelResult) => void;
  setLoadingState: (loading: boolean) => void;
  setErrorState: (isError: boolean, error: Error | null) => void;
  setFetchingState: (isFetching: boolean) => void;
  riskColour: string;
  setRiskColourState: (colour: string) => void;
}
const DashboardContext = createContext<ContextProps | null>(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider");
  }
  return context;
};

const DashboardProvider: React.FC<DashboardProps> = ({ children }) => {
  const [data, setData] = useState<ModelResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isFetching, setisFetching] = useState<boolean>(false);
  const [riskColour, setRiskColour] = useState<string>("");

  const setDataHandler = (data: ModelResult) => {
    setData(data);
  };

  const setLoadingState = (loading: boolean) => {
    setIsLoading(loading);
  };

  const setErrorState = (isError: boolean, error: Error | null) => {
    setIsError(isError);
    setError(error);
  };

  const setFetchingState = (isFetching: boolean) => {
    setisFetching(isFetching);
  };

  const setRiskColourState = (colour: string) => {
    setRiskColour(colour);
  };

  return (
    <DashboardContext.Provider
      value={{ data, isLoading, isError, error, isFetching, setDataHandler, setLoadingState, setErrorState, setFetchingState, setRiskColourState, riskColour }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export { DashboardContext, DashboardProvider };
