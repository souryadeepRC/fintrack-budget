import { useOutletContext } from "react-router";

import { CardListView, DashboardView } from "@/components/common";
import AppConstants from "@/constants";
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
          onClick: context.navigation.addEntry,
        },
      ]}
    >
      <CardListView
        onCardClick={context.navigation.showEntry}
        itemList={context.entries}
        property={{
          TITLE: "title",
          AMOUNT: "amount",
          DATE: "date",
        }}
        getChip={(item) => AppConstants.expenseCategory.get(item.category)}
      />
    </DashboardView>
  );
};

export default ExpenseList;
