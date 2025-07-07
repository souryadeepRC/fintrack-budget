import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock("@/constants", () => ({
  __esModule: true,
  default: {
    title: "Mocked FinTrack",
  },
}));

describe("App Component", () => {
  it("renders the title from constants", () => {
    render(<App />);
    expect(screen.getByText("Mocked FinTrack")).toBeInTheDocument();
  });

  it("renders heading and paragraph", () => {
    render(<App />);
    expect(screen.getByText("Track your expense")).toBeInTheDocument();
    expect(
      screen.getByText("Smart Monthly Budgeting & Expense Tracker")
    ).toBeInTheDocument();
  });

  it("renders the button with text", () => {
    render(<App />);
    const button = screen.getByTestId("action-btn");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });
});
