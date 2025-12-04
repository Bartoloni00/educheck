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
          ? "bg-gray-200 text-gray-900"
          : "text-gray-700 hover:bg-gray-100"
        }
      `}
      aria-label={label}
    >
      {icon}
      {label}
    </Link>
  );
};