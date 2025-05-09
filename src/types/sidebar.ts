
import { LucideIcon } from "lucide-react";
import { AccountType, Modules } from "./auth";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  module: Modules;
  requiredAction?: string;
  accountTypes?: AccountType[];
  children?: NavItem[];
}
