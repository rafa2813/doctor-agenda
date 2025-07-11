import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageContainer,
  PageHeader,
  PageHeaderContent,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  if (!("clinic" in session.user)) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Dashboard</PageHeaderTitle>
        </PageHeaderContent>
      </PageHeader>
    </PageContainer>
  );
};

export default DashboardPage;
