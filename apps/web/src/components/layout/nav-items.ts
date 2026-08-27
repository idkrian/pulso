import {
  LuLayoutDashboard,
  LuBicepsFlexed,
  LuClipboardList,
  LuCalendar,
  LuUser,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import type { TranslationKey } from "@/i18n";

export type NavItem = {
  to: string;
  labelKey: TranslationKey;
  Icon: IconType;
  end: boolean;
};

export const navItems: NavItem[] = [
  {
    to: "/",
    labelKey: "nav.dashboard",
    Icon: LuLayoutDashboard,
    end: true,
  },
  {
    to: "/exercises",
    labelKey: "nav.exercises",
    Icon: LuBicepsFlexed,
    end: false,
  },
  {
    to: "/training-splits",
    labelKey: "nav.splits",
    Icon: LuClipboardList,
    end: false,
  },
  { to: "/calendar", labelKey: "nav.calendar", Icon: LuCalendar, end: false },
  { to: "/profile", labelKey: "nav.profile", Icon: LuUser, end: false },
];
