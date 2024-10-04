import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 z-30 h-full w-[72px] flex-col md:flex">
        <NavigationSidebar />
      </div>

      <main className="h-full pl-[72px]"> {children}</main>
    </div>
  );
};

export default MainLayout;
