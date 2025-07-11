import { render, screen } from "@testing-library/react";
import Settings from "./Settings";

jest.mock("@/hooks", () => ({
  useSettings: () => ({
    paymentModes: [
      { id: "1", label: "Cash", value: "cash" },
      { id: "2", label: "GPay", value: "gpay" },
    ],
    expenseCategories: [
      { id: "3", label: "Groceries", value: "groceries" },
      { id: "4", label: "Transport", value: "transport" },
    ],
  }),
}));

describe("Settings component", () => {
  it("renders payment and expense category sections with correct labels", () => {
    render(<Settings />);

    expect(screen.getByText("Payment Mode")).toBeInTheDocument();
    expect(screen.getByText("Expense Category")).toBeInTheDocument();

    expect(screen.getByText("Cash")).toBeInTheDocument();
    expect(screen.getByText("GPay")).toBeInTheDocument();
    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("Transport")).toBeInTheDocument();
  });
});
