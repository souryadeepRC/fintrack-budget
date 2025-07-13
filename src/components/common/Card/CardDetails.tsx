import { Button } from "@/components/common";
import { ActionButtonType } from "@/types";
import "./CardDetails.scss";
import { FaArrowLeft } from "react-icons/fa";

type CardPropertyType = {
  label?: string;
  value: string | number;
  variant?: "default" | "heading" | "chip" | "description" | "amount";
};
interface CardDetailsProps {
  type: string;
  isEmpty: boolean;
  backAction?: ActionButtonType;
  actions?: ActionButtonType[];
  properties?: CardPropertyType[];
  children?: React.ReactNode;
}
const CardDetails: React.FC<CardDetailsProps> = (props) => {
  const { type, isEmpty, backAction, actions, children } = props;

  if (isEmpty) {
    return (
      <div className="card_details__container">
        {backAction && (
          <Button
            variant={backAction.variant}
            onClick={backAction.onClick}
            {...(backAction.mode && { mode: backAction.mode })}
            {...(backAction.startIcon
              ? { startIcon: backAction.startIcon }
              : { startIcon: <FaArrowLeft /> })}
          >
            {backAction.label}
          </Button>
        )}
        No record found
      </div>
    );
  }
  return (
    <div className="card_details__container">
      <section className="card_details__header">
        {backAction && (
          <Button
            variant="curve"
            onClick={backAction.onClick}
            {...(backAction.mode && { mode: backAction.mode })}
            {...(backAction.startIcon
              ? { startIcon: backAction.startIcon }
              : { startIcon: <FaArrowLeft /> })}
          >
            <></>
          </Button>
        )}
        <h2>{type}</h2>
        {actions && (
          <div className="card_details__actions">
            {actions.map((action, index) => {
              return (
                <Button
                  key={index}
                  data-testid={`${type}-${action.label}-btn`}
                  onClick={action.onClick}
                  variant={action.variant}
                  {...(action.mode && { mode: action.mode })}
                  {...(action.startIcon && { startIcon: action.startIcon })}
                >
                  {action?.label || <></>}
                </Button>
              );
            })}
          </div>
        )}
      </section>
      {children}
    </div>
  );
};
export default CardDetails;
