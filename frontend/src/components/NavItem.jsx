import { Link, useLocation } from "react-router-dom";

export const NavItem = ({ icon, label, to }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={`
        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
        ${active
          ? "bg-[#2c2f33] text-white"
          : "text-gray-300 hover:bg-[#2a2d31]"
        }
      `}
      aria-label={label}
    >
      {icon}
      {label}
    </Link>
  );
};
