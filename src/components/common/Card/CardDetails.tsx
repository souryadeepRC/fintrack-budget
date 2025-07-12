import { Button } from "@/components/common";
import { ActionButtonType } from "@/types";
import "./CardDetails.scss";
import { formatToINR } from "@/utils";
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
  properties: CardPropertyType[];
}
const CardDetails: React.FC<CardDetailsProps> = (props) => {
  const { type, isEmpty, backAction, actions, properties } = props;

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
      <section className="card_details__header">
        <h2>{type}</h2>
        {actions && (
          <div className="card_details__actions">
            {actions.map((action) => {
              return (
                <Button
                  key={action.label}
                  data-testid={`${type}-${action.label}-btn`}
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
      </section>
      <section className="card__details">
        {properties.map((property, index) => {
          if (property.variant === "heading") {
            return (
              <h5 key={index} className="card__heading">
                {property.value}
              </h5>
            );
          } else if (property.variant === "chip") {
            return (
              <p key={index} className="card__chip">
                {property.value}
              </p>
            );
          } else if (property.variant === "amount") {
            return (
              <p key={index}>
                <strong>{property.label}:&nbsp;</strong>
                Rs.&nbsp;{formatToINR(Number(property.value))}
              </p>
            );
          } else if (property.variant === "description") {
            return (
              <p key={index} className="card__description">
                <strong>{property.label}:&nbsp;</strong>
                <em>{property.value}</em>
              </p>
            );
          }
          return (
            <p key={index}>
              <strong>{property.label}:&nbsp;</strong>&nbsp;{property.value}
            </p>
          );
        })}
      </section>
    </div>
  );
};
export default CardDetails;
