import { PlusIcon } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
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

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
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
          <Button>
            <PlusIcon className="h-4 w-4" />
            Adicionar Médico
          </Button>
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
