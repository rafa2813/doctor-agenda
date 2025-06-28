"use client";
//lembrete: tudo funcionando - hora: 15h50

import {
  CalendarIcon,
  LayoutDashboardIcon,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

// TODO: Change to real data
const data = {
  teams: [
    {
      name: "Dr. Agenda",
      logo: Stethoscope,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Agendamentos",
      url: "/appointments",
      icon: CalendarIcon,
    },
    {
      title: "Médicos",
      url: "/doctors",
      icon: Stethoscope,
    },
    {
      title: "Pacientes",
      url: "/patients",
      icon: UsersRound,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const session = authClient.useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/authentication");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b pt-4 pb-4">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="pt-4 pb-4">
        <NavMain items={data.navMain} isActive={pathname} />
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <NavUser
          user={{
            name: session.data?.user?.name ?? "",
            email: session.data?.user?.email ?? "",
            avatar: session.data?.user?.image ?? "",
          }}
          handleSignOut={handleSignOut}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
