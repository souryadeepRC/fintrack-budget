import { CategoryOption as CategoryOptionType } from "@/types";

interface CategoryOptionProps {
  title: string;
  options: CategoryOptionType[];
}

const CategoryOption: React.FC<CategoryOptionProps> = (props) => {
  const { title, options } = props;
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {options.map((option: CategoryOptionType) => (
          <li key={option.id}>{option.label}</li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryOption;
