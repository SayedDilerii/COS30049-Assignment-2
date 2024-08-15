import { Sun } from "lucide-react";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="h-[40px] flex items-center gap-2 py-2 px-4 bg-emerald-600">
      <Sun className="text-emerald-200" size={22} />
      <p className="text-[0.9em] text-emerald-100 cursor-default" title="FireGuard Logo - Stay safe, stay aware.">
        FireGuard
      </p>
    </nav>
  );
};

const MemoizedNavbar = React.memo(Navbar);
MemoizedNavbar.displayName = "MemoizedNavbar";

export default MemoizedNavbar;
