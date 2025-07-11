import { render, screen } from "@testing-library/react";
import CategoryOption from "./CategoryOption";

describe("CategoryOption component", () => {
  const mockOptions = [
    { id: "1", label: "Groceries", value: "groceries" },
    { id: "2", label: "Transport", value: "transport" },
  ];

  it("renders the title correctly", () => {
    render(<CategoryOption title="Expense Categories" options={mockOptions} />);
    expect(screen.getByText("Expense Categories")).toBeInTheDocument();
  });

  it("renders all category options", () => {
    render(<CategoryOption title="Test Title" options={mockOptions} />);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("renders an empty list if no options are passed", () => {
    render(<CategoryOption title="Empty Test" options={[]} />);
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);
  });
});
