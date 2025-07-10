import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom";

const StartIcon = () => <span data-testid="start-icon">S</span>;
const EndIcon = () => <span data-testid="end-icon">E</span>;

describe("Button Component", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders with default variant (contained)", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "contained");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Click</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("applies variant and mode classes", () => {
    render(
      <Button variant="outlined" mode="warning">
        Submit
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("outlined", "warning");
  });

  it("applies disabled class when disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled");
  });

  it("renders startIcon and endIcon", () => {
    render(
      <Button startIcon={<StartIcon />} endIcon={<EndIcon />}>
        Save
      </Button>
    );
    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
  });

  it("handles onClick event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
