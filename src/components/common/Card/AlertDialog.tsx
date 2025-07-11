import { Button, Modal } from "@/components/common";
import "./AlertDialog.scss";
import { ActionButtonType } from "@/types";
interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  actions: ActionButtonType[];
}

const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const { isOpen, onClose, message, actions } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="alert_dialog__container">
        <h4>{message}</h4>
        {actions && (
          <div className="action__btns">
            {actions.map((action) => {
              return (
                <Button
                  key={action.label}
                  data-testid={`alert-${action.label}-btn`}
                  onClick={action.onClick}
                  variant={action.variant}
                  {...(action.mode && { mode: action.mode })}
                  {...(action.startIcon && { startIcon: action.startIcon })}
                >
                  {action.label}
                </Button>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AlertDialog;
