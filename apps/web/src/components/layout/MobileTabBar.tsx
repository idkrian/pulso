import { NavLink } from "react-router";
import { useT } from "@/i18n";
import { navItems } from "./nav-items";

const MobileTabBar = () => {
  const t = useT();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-mediumGrey bg-darkGrey/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="flex items-stretch justify-around">
        {navItems.map(({ to, labelKey, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex min-h-14 flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? "text-lightIndigo" : "text-lightGrey/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`absolute inset-x-3 top-0 h-px bg-lightIndigo transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                <Icon size={20} />
                <span className="text-[10px] font-medium uppercase tracking-wider">
                  {t(labelKey)}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileTabBar;
