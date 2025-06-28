import { PlusIcon } from "lucide-react";

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

const DoctorsPage = () => {
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
          <h1 className="text-2xl font-bold">Médicos</h1>
        </div>
      </PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
