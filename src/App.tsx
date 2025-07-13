import { Outlet } from "react-router";

import Navigation from "@/components/navigation/Navigation";
import "./App.scss";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
