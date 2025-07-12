import Card from "./Card";
import "./Card.scss";

type CardPropertyState = "Chip" | "Title" | "Amount" | "Date";
export type CardPropertyType = Partial<
  Record<Uppercase<CardPropertyState>, string>
>;
interface CardListViewProps {
  onCardClick?: (itemId: string) => void;
  itemList: any[];
  property: CardPropertyType;
}

const CardListView: React.FC<CardListViewProps> = (props) => {
  const { onCardClick, property, itemList } = props;

  return (
    <section className="card__list">
      {itemList.map((item) => {
        return (
          <Card
            key={item.id}
            {...(onCardClick && { onClick: () => onCardClick(item.id) })}
            details={{
              chip: (property.CHIP && item?.[property.CHIP]) || "",
              title: (property.TITLE && item?.[property.TITLE]) || "",
              amount: (property.AMOUNT && item?.[property.AMOUNT]) || "",
              date: (property.DATE && item?.[property.DATE]) || "",
            }}
          />
        );
      })}
    </section>
  );
};
export default CardListView;
