import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  it("renders when open", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Test Modal">
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} onClose={onCloseMock} title="Should Not Show">
        <p>Hidden</p>
      </Modal>
    );

    expect(screen.queryByText("Should Not Show")).not.toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock} title="Closable">
        <p>Text</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId("modal-backdrop"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when Escape key is pressed", () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <p>Close Me</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <Modal isOpen={true} showCloseIcon={true} onClose={onCloseMock}>
        <p>Closing</p>
      </Modal>
    );

    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
