// import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useEffect } from "react";
import SuspenseContent from "./SuspenseContent";
import Header from "../Header";
import { Copyright } from "@/Components/Copyright";

function PageContent() {
    // const { pageTitle } = useAppSelector((state) => state.header);

    // Scroll back to top on new page load
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="drawer-content bg-base-200 flex flex-col overflow-hidden">
            <Header />
            <main className="lg:px-10 overflow-auto flex-1 overflow-y-auto pt-8 px-6 bg-base-200 h-full flex flex-col">
                <Suspense fallback={<SuspenseContent />}>
                    <Outlet />
                </Suspense>
                <Copyright />
            </main>
        </div>
    );
}

export default PageContent;
