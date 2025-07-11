import { useOutletContext } from "react-router";

import { CardListView, DashboardView } from "@/components/common";
import { EntryContext } from "@/types";

const ExpenseList = () => {
  const context: EntryContext = useOutletContext();

  return (
    <DashboardView
      isLoading={!context.isEntryLoaded}
      type={context.type}
      headerActions={[
        {
          label: `Add ${context.type}`,
          onClick: context.onAddEntry,
        },
      ]}
    >
      <CardListView
        onCardClick={context.showEntryDetails}
        itemList={context.entries}
        chipProperty="category"
      />
    </DashboardView>
  );
};

export default ExpenseList;
