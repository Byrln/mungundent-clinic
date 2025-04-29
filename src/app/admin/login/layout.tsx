import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Админ нэвтрэх | Мөнгөндент",
  description: "Мөнгөндент шүдний эмнэлгийн админ хэсэгт нэвтрэх",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}