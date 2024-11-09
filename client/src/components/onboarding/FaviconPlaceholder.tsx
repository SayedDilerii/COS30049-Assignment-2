import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

interface Props {
  children?: React.ReactNode;
  isIcon: boolean;
  icon?: LucideIcon;
}

const FaviconPlaceholder = forwardRef<HTMLDivElement | HTMLImageElement, Props>(({ children, isIcon, icon: Icon }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 700px)");

  return isIcon && Icon ? (
    <div className="rounded-full w-[80px] h-[80px] flex justify-center items-center border sm:w-[200px] sm:h-[200px] bg-emerald-200" ref={ref}>
      <Icon size={isDesktop ? 64 : 36} color="green" />
    </div>
  ) : (
    <div ref={ref}>
      <img className="w-[80px] sm:w-[200px] h-full" src={children as string} />
    </div>
  );
});

export default FaviconPlaceholder;
