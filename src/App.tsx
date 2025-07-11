import { Outlet } from "react-router";
import { Toaster } from "sonner";

import Navigation from "@/components/navigation/Navigation";
import AppProvider from "@/components/Application/AppProvider";
import "./App.scss";

function App() {
  return (
    <AppProvider>
      <Toaster richColors position="top-right" />
      <Navigation />
      <Outlet />
    </AppProvider>
  );
}

export default App;
