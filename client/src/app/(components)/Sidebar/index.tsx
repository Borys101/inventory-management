"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSideBarCollapsed } from "@/state";
import {
    Archive,
    CircleDollarSign,
    Clipboard,
    Layout,
    LucideIcon,
    Menu,
    SlidersHorizontal,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarLinkProps {
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
}

const sidebarLinksList = (sideBarCollapseState: boolean) => [
    {
        href: "/dashboard",
        icon: Layout,
        label: "Dashboard",
        isCollapsed: sideBarCollapseState,
    },
    {
        href: "/inventory",
        icon: Archive,
        label: "Inventory",
        isCollapsed: sideBarCollapseState,
    },
    {
        href: "/products",
        icon: Clipboard,
        label: "Products",
        isCollapsed: sideBarCollapseState,
    },
    {
        href: "/users",
        icon: User,
        label: "Users",
        isCollapsed: sideBarCollapseState,
    },
    {
        href: "/settings",
        icon: SlidersHorizontal,
        label: "Settings",
        isCollapsed: sideBarCollapseState,
    },
    {
        href: "/expenses",
        icon: CircleDollarSign,
        label: "Expenses",
        isCollapsed: sideBarCollapseState,
    },
];

const SidebarLink = ({
    href,
    icon: Icon,
    label,
    isCollapsed,
}: SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive =
        pathname === href || (pathname === "/" && href === "/dashboard");

    return (
        <Link href={href}>
            <div
                className={`cursor-pointer flex items-center ${
                    isCollapsed
                        ? "justify-center py-4"
                        : "justify-start px-8 py-4"
                } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
                    isActive ? "bg-blue-200 text-white" : ""
                }`}
            >
                <Icon className="w-6 h-6 !text-gray-700" />
                <span
                    className={`${
                        isCollapsed ? "hidden" : "block"
                    } font-medium text-gray-700`}
                >
                    {label}
                </span>
            </div>
        </Link>
    );
};

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const activeSideBarLinks = sidebarLinksList(isSidebarCollapsed);

    const toggleSidebar = () => {
        dispatch(setIsSideBarCollapsed(!isSidebarCollapsed));
    };

    const sidebarClassNames = `fixed flex flex-col ${
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
    } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40 justify-between`;
    return (
        <div className={sidebarClassNames}>
            {/* TOP LOGO */}
            <div>
                <div
                    className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
                        isSidebarCollapsed ? "px-5" : "px-8"
                    }`}
                >
                    <div>Logo</div>
                    <h1
                        className={`${
                            isSidebarCollapsed ? "hidden" : "block"
                        } font-extrabold text-2xl`}
                    >
                        LIMSTOCK
                    </h1>

                    <button
                        className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
                        onClick={toggleSidebar}
                    >
                        <Menu className="w-4 h-4" />
                    </button>
                </div>
                {/* LINKS */}
                <div>
                    {activeSideBarLinks.map((link) => (
                        <SidebarLink
                            key={link.href}
                            href={link.href}
                            icon={link.icon}
                            label={link.label}
                            isCollapsed={isSidebarCollapsed}
                        />
                    ))}
                </div>
            </div>
            {/*FOOTER */}
            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
                <p className="text-center text-xs text-gray-500">
                    &copy; 2024 Limstock
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
