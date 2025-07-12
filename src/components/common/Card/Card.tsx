import { CiCalendarDate } from "react-icons/ci";
import { convertDate, formatToINR } from "@/utils";
import "./Card.scss";

interface CardProps {
  onClick?: () => void;
  details: {
    chip: string;
    title: string;
    amount: string | number;
    date: string;
  };
}
const Card: React.FC<CardProps> = (props) => {
  const { onClick, details } = props;
  const { title, amount, date } = details;
  return (
    <div onClick={onClick} className="card__item">
      <h4 className="card__title">{title}</h4>
      <div className="card__info">
        {date && (
          <p className="card__date">
            <CiCalendarDate />
            {convertDate(date)}
          </p>
        )}
        {Boolean(amount) && (
          <strong className="card__amount">
            Rs.&nbsp;{formatToINR(+amount)}
          </strong>
        )}
      </div>
    </div>
  );
};
export default Card;
