import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

interface Props {
  children?: React.ReactNode;
  isIcon: boolean;
  icon?: LucideIcon;
}

const FaviconPlaceholder = forwardRef<HTMLDivElement | HTMLImageElement, Props>(({ children, isIcon, icon: Icon }, ref) => {
  return isIcon && Icon ? (
    <div className="rounded-full p-12 bg-emerald-200 w-fit" ref={ref}>
      <Icon size={64} color="green" />
    </div>
  ) : (
    <div ref={ref}>
      <img className="w-[200px] h-full" src={children as string} />
    </div>
  );
});

export default FaviconPlaceholder;
