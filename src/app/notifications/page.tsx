"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";

import { HeaderBanner } from "@/components/common/HeaderBanner";
import { PageTabs } from "@/components/common/PageTabs";
import { LoadingSpinner } from "@/components/loader/LoadingSpinner";
import { NotificationCard } from "@/components/notification/notification-card";
import { NotificationForm } from "@/components/notification/notification-form";
import { QUERY_CONFIG } from "@/constants/query-constants";
import { getNotifications } from "@/services/notification.service";
import { Notification } from "@/types";
import { DropDown, Modal } from "@/components/common";

export default function NotificationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "all">("upcoming");
  const [upcomingDays, setUpcomingDays] = useState<number>(10);
  const [editingNotification, setEditingNotification] = useState<
    Notification | undefined
  >(undefined);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", "all"],
    queryFn: () => getNotifications(),
    ...QUERY_CONFIG,
  });

  const filteredNotifications = useMemo(() => {
    if (!notifications) return [];
    if (activeTab === "all") return notifications;

    const today = new Date();
    return notifications.filter((n) => {
      const expDate = new Date(n.expiryDate);
      // Using Math.ceil to normalize boundary days nicely
      const diffDays = Math.ceil(
        (expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
      // Include items that are due strictly within the timeline, including overdue items
      return diffDays <= upcomingDays;
    });
  }, [notifications, activeTab, upcomingDays]);

  const handleOpenAddTransaction = () => {
    setEditingNotification(undefined);
    setIsModalOpen(true);
  };
  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading notifications..." />;
  }

  return (
    < >
      <HeaderBanner
        title="Notifications"
        description="Manage and track your upcoming recurring payments."
        aiLabel="Debts Tracking Active"
        actionLabel="Add Notification"
        onAction={handleOpenAddTransaction}
      />

      {/* Filter Tabs */}
      <PageTabs
        tabs={[
          {
            title: "Upcoming",
            onClick: () => setActiveTab("upcoming"),
            isActive: activeTab === "upcoming",
          },
          {
            title: "All Notifications",
            onClick: () => setActiveTab("all"),
            isActive: activeTab === "all",
          },
        ]}
      >
        {activeTab === "upcoming" && (
          <DropDown 
          
            value={upcomingDays.toString()}
            options={[
              { label: "Within 5 Days", value: '5' },
              { label: "Within 10 Days", value: '10' },
              { label: "Within 15 Days", value: '15' },
            ]}
            onValueChange={(value) => setUpcomingDays(Number(value))}
          />
        )}
      </PageTabs>

      {/* List */}
      <section className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-xl bg-slate-50 text-slate-500">
            No notifications found for this criteria. 🎉
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                showPayNow={activeTab === "upcoming"}
                onEdit={(data) => {
                  setEditingNotification(data);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={
            !!editingNotification ? "Edit Notification" : "Add Notification"
          }
          onClose={() => setIsModalOpen(false)}
        >
          <NotificationForm
            initialData={editingNotification}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
