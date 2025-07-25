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
          label: `Add ${context.type}`,
          onClick: context.navigation.addEntry,
        },
      ]}
    >
      <CardListView
        onCardClick={context.navigation.showAll}
        itemList={context.entries}
        property={{
          TITLE: "title",
          AMOUNT: "amount",
          DATE: "registerDate",
        }}
        getChip={(item) =>
          item.expiryDate && {
            value: `Expire on ${convertDate(item.expiryDate)}`,
          }
        }
      />
    </DashboardView>
  );
};

export default NotificationList;
