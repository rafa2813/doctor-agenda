import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-6 p-6">{children}</div>;
};

// PageHeader
export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      {children}
    </div>
  );
};

// PageHeaderContent
export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full space-y-2">{children}</div>;
};

// PageBreadcrumb
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
    <div className="text-muted-foreground flex w-full items-center gap-2 text-sm font-medium">
      {items.map((item, index) => (
        // eslint-disable-next-line react/jsx-key
        <Link
          href={item.href}
          className="hover:text-primary flex items-center gap-2 transition-colors duration-300"
        >
          {item.label}
          {index < items.length - 1 && (
            <span className="mx-2">
              <ChevronRightIcon className="h-4 w-4" />
            </span>
          )}
        </Link>
      ))}
      {children && <span className="text-primary mx-2">{children}</span>}
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
