import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageBreadcrumb,
  PageContainer,
  PageContent,
  PageHeader,
  PageHeaderAction,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import AddDoctorButton from "./_components/add-doctor-button";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  if (!("clinic" in session.user)) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageBreadcrumb
            items={[
              { label: "Menu Principal", href: "/dashboard" },
              { label: "Médicos", href: "/doctors" },
            ]}
          />
          <PageHeaderTitle>Médicos</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie os médicos da sua clínica.
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderAction>
          <AddDoctorButton />
        </PageHeaderAction>
      </PageHeader>
      <PageContent>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Lista de Médicos</h1>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
