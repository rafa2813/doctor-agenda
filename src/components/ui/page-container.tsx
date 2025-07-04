import Link from "next/link";

//layout container
export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full space-y-6 p-6">{children}</div>;
};

//layout cabeçalho
export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

//layout conteúdo do cabeçalho
export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full space-y-1">{children}</div>;
};

//layout título
export const PageHeaderTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export const PageBreadcrumb = ({
  items,
}: {
  items: { label: string; href: string }[];
}) => {
  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </div>
  );
};

//layout descrição
export const PageHeaderDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

//layout ações (botões)
export const PageHeaderActions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

//layout conteúdo principal
export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full space-y-6">{children}</div>;
};
