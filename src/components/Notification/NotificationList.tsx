import { useOutletContext } from "react-router";

import { CardListView, DashboardView } from "@/components/common";
import { EntryContext } from "@/types";
import { convertDate } from "@/utils";

const NotificationList = () => {
  const context: EntryContext = useOutletContext();

  return (
    <DashboardView
      isLoading={!context.isEntryLoaded}
      type={context.type}
      headerActions={[
        {
          label: `Upcoming ${context.type}`,
          onClick: context.navigation.showUpcoming as () => void,
        },
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
        }}
        getChip={(item) =>
          item.expiryDate && {
            value: `Due date: ${convertDate(item.expiryDate)}`,
          }
        }
      />
    </DashboardView>
  );
};

export default NotificationList;
