import { Outlet } from "react-router";

import Navigation from "@/components/navigation/Navigation";
import "./App.scss";
import { Suspense } from "react";
import SkeletonLoader from "./components/common/Loader/SkeletonLoader";

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<SkeletonLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default App;
