import Card from "./Card";
import "./Card.scss";

interface CardListViewProps {
  onCardClick?: (itemId: string) => void;
  itemList: any[];
  chipProperty: string;
}

const CardListView: React.FC<CardListViewProps> = (props) => {
  const { onCardClick, chipProperty, itemList } = props;

  return (
    <section className="card__list">
      {itemList.map((item) => {
        const { title, amount, date } = item;
        return (
          <Card
            key={item.id}
            {...(onCardClick && { onClick: () => onCardClick(item.id) })}
            details={{ chip: item[chipProperty], title, amount, date }}
          />
        );
      })}
    </section>
  );
};
export default CardListView;
