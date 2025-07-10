import { useNavigate } from "react-router";

const ExpenseFilter = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <button onClick={onBack}>Back</button>List of Filters
    </div>
  );
};

export default ExpenseFilter;
