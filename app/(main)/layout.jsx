import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
