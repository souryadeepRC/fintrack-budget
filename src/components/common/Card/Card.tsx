import { convertDate, formatToINR } from "@/utils";
import "./Card.scss";
import { IconType } from "react-icons";

interface CardProps {
  onClick?: () => void;
  id: string;
  details: {
    chip?: { value: string; Icon?: IconType } | undefined;
    title: string;
    amount: string | number;
    date: string;
  };
}
const Card: React.FC<CardProps> = (props) => {
  const { onClick, details } = props;
  const { title, amount, date, chip } = details;

  return (
    <div onClick={onClick} className={`card__item  `}>
      <div className="card__container">
        {chip?.Icon && (
          <div className="card__chip_icon">
            <chip.Icon />
          </div>
        )}
        <div className="card__desc">
          <h4 className="card__title">{title}</h4>
          {chip?.value && <p className="card__chip">{chip.value}</p>}
        </div>
        <div className="card__value">
          <strong className="card__amount">
            Rs.&nbsp;{formatToINR(+amount)}
          </strong>
          {date && <p className="card__date">{convertDate(date)}</p>}
        </div>
      </div>
    </div>
  );
};
export default Card;
