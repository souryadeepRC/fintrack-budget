import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock("@/components/navigation/Navigation", () => ({
  __esModule: true,
  default: () => <div>Navigation</div>,
}));
jest.mock("react-router", () => ({
  Outlet: () => <div>Outlet</div>,
}));

describe("App Component", () => {
  it("renders Navigation and load router outlet", () => {
    render(<App />);
    expect(screen.getByText("Navigation")).toBeInTheDocument();
    expect(screen.getByText("Outlet")).toBeInTheDocument();
  });
});
