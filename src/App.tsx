import "./App.scss";
import { Button } from "@/components/ui/button";
import APP_CONSTANTS from "@/constants";
import { Outlet } from "react-router";

function App() {
  return (
    <div>
      <h1>{APP_CONSTANTS.title}</h1>
      <h2>Track your expense</h2>
      <p>Smart Monthly Budgeting & Expense Tracker</p>
      <div className="flex   flex-col items-center justify-center">
        <Button data-testid="action-btn">Click me</Button>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
