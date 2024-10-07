import { Sun } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const url = useLocation();

  return (
    <nav className="h-[40px] flex items-center gap-2 py-6 px-12 bg-[#106B40]">
      <Sun className="text-emerald-100" size={22} />
      <Link
        to={url.pathname === "/onboarding" ? "/onboarding" : "/dashboard"}
        className="text-[1em] text-emerald-100 cursor-pointer"
        title="FireGuard Logo - Stay safe, stay aware."
      >
        FireGuard
      </Link>
    </nav>
  );
};

const MemoizedNavbar = React.memo(Navbar);
MemoizedNavbar.displayName = "MemoizedNavbar";

export default MemoizedNavbar;
