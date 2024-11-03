import { createContext, useState } from "react";

interface NavigationProps {
  children: React.ReactNode;
}

interface ContextProps {
  isMobileView: boolean;
  setMobileViewHandler: (state: boolean) => void;
}

const NavigationContext = createContext<ContextProps | null>(null);

const NavigationProvider: React.FC<NavigationProps> = ({ children }) => {
  const [isMobileView, setMobileView] = useState<boolean>(false);

  const setMobileViewHandler = (state: boolean) => {
    setMobileView(state);
  };

  // console.log("MOBILE VIEW CONTEXT: ", isMobileView);

  return <NavigationContext.Provider value={{ isMobileView, setMobileViewHandler }}>{children}</NavigationContext.Provider>;
};

export { NavigationContext, NavigationProvider };
