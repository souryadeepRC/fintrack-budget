import { Outlet } from "react-router";
import { Toaster } from "sonner";

import Navigation from "@/components/navigation/Navigation";
import "./App.scss";

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
