import { CiCalendarDate } from "react-icons/ci";
import { convertDate } from "@/utils";
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
  const { chip, title, amount, date } = details;
  return (
    <div onClick={onClick} className="card__item">
      {chip && <p className="card__category">{chip}</p>}
      <h4 className="card__title">{title}</h4>
      {Boolean(amount) && <p className="card__amount">Rs.&nbsp;{amount}</p>}
      {date && (
        <p className="card__date">
          <CiCalendarDate />
          {convertDate(date)}
        </p>
      )}
    </div>
  );
};
export default Card;
