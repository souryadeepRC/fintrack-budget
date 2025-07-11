import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";

jest.mock("react-router", () => ({
  NavLink: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock("@/constants", () => ({
  __esModule: true,
  default: {
    title: "Mocked FinTrack",
  },
}));

describe("Navigation component", () => {
  it("renders the app title", () => {
    render(<Navigation />);
    expect(screen.getByText("Mocked FinTrack")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<Navigation />);

    const navItems = [
      { label: "Expense", path: "/expense" },
      { label: "Debt", path: "/debt" },
      { label: "Notification", path: "/auto-pay" },
      { label: "Settings", path: "/settings" },
    ];

    navItems.forEach(({ label, path }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
      const link = screen.getByText(label).closest("a");
      expect(link).toHaveAttribute("href", path);
    });
  });
});
