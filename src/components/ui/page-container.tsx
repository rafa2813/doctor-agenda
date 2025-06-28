import Link from "next/link";
export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6 p-6">{children}</div>;
};

// PageHeader
export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">{children}</div>
  );
};

// PageHeaderContent
export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="space-y-2">{children}</div>;
};

export const PageBreadcrumb = ({
  items,
  children = null,
}: {
  items: {
    label: string;
    href: string;
  }[];
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-2">
      {items.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <Link href={item.href}>{item.label}</Link>
      ))}
      {children}
    </div>
  );
};

// PageHeaderTitle
export const PageHeaderTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

// PageHeaderDescription
export const PageHeaderDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

// PageHeaderAction
export const PageHeaderAction = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

// PageContent
export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6">{children}</div>;
};
