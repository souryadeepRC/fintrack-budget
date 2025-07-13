import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";

// Mocking `react-redux` and selector
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mocking NavLink from react-router
jest.mock("react-router", () => ({
  NavLink: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

// Mocking constants
jest.mock("@/constants", () => ({
  __esModule: true,
  default: {
    title: "Finance Tracker",
  },
}));

// Mock the selector
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

describe("Navigation Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should not render if user is not logged in", () => {
    mockUseSelector.mockReturnValue(false); // not logged in
    const { container } = render(<Navigation />);
    expect(container.firstChild).toBeNull();
  });

  it("should render navigation when user is logged in", () => {
    mockUseSelector.mockReturnValue(true); // logged in
    render(<Navigation />);

    // Header title
    expect(screen.getByText("Finance Tracker")).toBeInTheDocument();

    // All navigation items
    expect(screen.getByText("Expense")).toBeInTheDocument();
    expect(screen.getByText("Debt")).toBeInTheDocument();
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("should have correct navigation links", () => {
    mockUseSelector.mockReturnValue(true);
    render(<Navigation />);

    expect(screen.getByText("Expense").closest("a")).toHaveAttribute(
      "href",
      "/expense"
    );
    expect(screen.getByText("Debt").closest("a")).toHaveAttribute(
      "href",
      "/debt"
    );
    expect(screen.getByText("Notification").closest("a")).toHaveAttribute(
      "href",
      "/notification"
    );
    expect(screen.getByText("Profile").closest("a")).toHaveAttribute(
      "href",
      ""
    );
  });
});
