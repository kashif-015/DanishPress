import { Header } from "@/components/layout/Header";

export default function CardDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-40 bg-white overflow-auto">
      <Header />
      {children}
    </div>
  );
}
