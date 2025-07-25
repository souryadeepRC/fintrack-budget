import Card from "./Card";
import "./Card.scss";
import { IconType } from "react-icons";

type CardPropertyState = "Title" | "Amount" | "Date";
export type CardPropertyType = Partial<
  Record<Uppercase<CardPropertyState>, string>
>;
interface CardListViewProps {
  onCardClick?: (itemId: string) => void;
  itemList: any[];
  property: CardPropertyType;
  getChip?: (item: any) => { value: string; Icon?: IconType } | undefined;
}

const CardListView: React.FC<CardListViewProps> = (props) => {
  const { onCardClick, property, itemList, getChip } = props;

  return (
    <section className="card__list">
      {itemList.map((item) => {
        return (
          <Card
            key={item.id}
            id={item.id}
            {...(onCardClick && { onClick: () => onCardClick(item.id) })}
            details={{
              ...(getChip && { chip: getChip(item) }),
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
