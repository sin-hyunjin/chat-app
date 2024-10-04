import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="navigation-sidebar w-18 fixed inset-y-0 z-20 h-full flex-col">
        <NavigationSidebar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};

export default MainLayout;
