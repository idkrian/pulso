import { Outlet } from "react-router";
import InstallBanner from "@/components/pwa/InstallBanner";
import Navbar from "./Navbar";
import MobileTabBar from "./MobileTabBar";

const AppLayout = () => {
  return (
    <div className="min-h-dvh bg-backgroundBlack lg:h-dvh lg:px-8 lg:py-8 xl:px-12 2xl:px-24">
      <div className="flex min-h-dvh w-full flex-col gap-4 bg-darkGrey p-4 pt-[calc(1rem+env(safe-area-inset-top))] lg:h-full lg:min-h-0 lg:overflow-hidden lg:rounded-xl lg:p-8 lg:shadow-xl">
        <Navbar />
        <main className="flex-1 pb-[calc(3.5rem+1rem+env(safe-area-inset-bottom))] lg:-mr-2 lg:min-h-0 lg:overflow-y-auto lg:pb-0 lg:pr-2">
          <Outlet />
        </main>
      </div>
      <MobileTabBar />
      <InstallBanner />
    </div>
  );
};

export default AppLayout;
