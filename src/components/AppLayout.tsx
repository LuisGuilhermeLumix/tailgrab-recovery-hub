import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { PageHeader } from "./PageHeader";

export function AppLayout({
  title,
  children,
  showFilters = true,
}: {
  title: string;
  children: ReactNode;
  showFilters?: boolean;
}) {
  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <main className="md:pl-[220px]">
        <PageHeader title={title} showFilters={showFilters} />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
