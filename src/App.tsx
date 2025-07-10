import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import Navigation from "@/components/navigation/Navigation";
import "./App.scss";
import Landing from "./components/Landing/Landing";

function App() {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-right" />
        <Navigation />
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}

export default App;
