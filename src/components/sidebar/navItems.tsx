
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Building,
  UserCog,
  FileCheck,
  PackageCheck,
  Database,
  CreditCard,
  UserCircle,
  ShieldCheck,
  FileClock,
  GitBranch,
  History,
  BookOpen,
  GraduationCap,
  Scale,
  Gavel,
  Briefcase,
  ScrollText,
  Calendar,
  FolderOpen,
  BookMarked
} from "lucide-react";
import { Modules, AccountType, NavItem } from "@/types/auth";

export const navItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    module: Modules.Dashboard,
  },
  {
    href: "/cases",
    label: "Cases",
    icon: Briefcase,
    module: Modules.CaseManagement,
    children: [
      {
        href: "/cases",
        label: "All Cases",
        icon: FolderOpen,
        module: Modules.CaseManagement,
      },
      {
        href: "/case-journey",
        label: "Case Journey",
        icon: GitBranch,
        module: Modules.CaseManagement,
      },
      {
        href: "/document-generation",
        label: "Document Generation",
        icon: FileCheck,
        module: Modules.CaseManagement,
      }
    ]
  },
  // Staff Management for both Super Admin and Organization
  {
    href: "/staff-management",
    label: "Staff Management",
    icon: Users,
    module: Modules.StaffManagement,
    accountTypes: [AccountType.SUPER_ADMIN, AccountType.ORGANISATION],
    children: [
      {
        href: "/roles-management",
        label: "Role Management",
        icon: ShieldCheck,
        module: Modules.RoleManagement,
      },
      {
        href: "/users-management",
        label: "User Management",
        icon: UserCog, 
        module: Modules.UserManagement,
      }
    ]
  },
  // Master Data for Super Admin
  {
    href: "/master-data",
    label: "Master Data",
    icon: Database,
    module: Modules.MasterDataManagement,
    accountTypes: [AccountType.SUPER_ADMIN, AccountType.ORGANISATION],
  },
  // Law Firms for Super Admin
  {
    href: "/law-firms",
    label: "Law Firms",
    icon: Scale,
    module: Modules.LawFirmManagement,
    accountTypes: [AccountType.SUPER_ADMIN],
  },
  // Plans for Super Admin
  {
    href: "/plans",
    label: "Plans",
    icon: PackageCheck,
    module: Modules.PlanManagement,
    accountTypes: [AccountType.SUPER_ADMIN],
  },
  // Company Profile for Organization
  {
    href: "/company-profile",
    label: "Company Profile",
    icon: Building,
    module: Modules.CompanyProfile,
    accountTypes: [AccountType.ORGANISATION],
  },
  // Invoices for Super Admin and Organization
  {
    href: "/invoices",
    label: "Invoices",
    icon: CreditCard,
    module: Modules.InvoiceManagement,
    accountTypes: [AccountType.SUPER_ADMIN, AccountType.ORGANISATION],
  },
  // Calendar for all
  {
    href: "/calendar",
    label: "Calendar",
    icon: Calendar,
    module: Modules.Dashboard,
  },
  // Legal Library
  {
    href: "/legal-library",
    label: "Legal Library",
    icon: BookMarked,
    module: Modules.Dashboard,
  },
  // User Profile for all
  {
    href: "/profile",
    label: "Profile",
    icon: UserCircle,
    module: Modules.UserProfile,
  },
  // Settings for all
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    module: Modules.Settings,
  },
];
