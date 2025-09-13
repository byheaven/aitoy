import { TabBar } from '@/components/layout/TabBar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      <TabBar />
    </div>
  );
}