"use client";

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/notification.service";
import { LoadingSpinner } from "@/components/loader/LoadingSpinner";
import { NotificationForm } from "@/components/notification/notification-form";
import { NotificationCard } from "@/components/notification/notification-card";
import { Notification } from "@/types";
import { QUERY_CONFIG } from "@/constants/query-constants";

export default function NotificationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "all">("upcoming");
  const [upcomingDays, setUpcomingDays] = useState<number>(10);
  const [editingNotification, setEditingNotification] = useState<Notification | undefined>(undefined);

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", "all"],
    queryFn: () => getNotifications(),
    ...QUERY_CONFIG,
  });

  const filteredNotifications = useMemo(() => {
    if (!notifications) return [];
    if (activeTab === "all") return notifications;

    const today = new Date();
    return notifications.filter(n => {
      const expDate = new Date(n.expiryDate);
      // Using Math.ceil to normalize boundary days nicely
      const diffDays = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      // Include items that are due strictly within the timeline, including overdue items 
      return diffDays <= upcomingDays;
    });
  }, [notifications, activeTab, upcomingDays]);

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Loading notifications..." />;
  }

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-slate-600 mt-1">Manage and track your upcoming recurring payments.</p>
        </div>
        <button 
          onClick={() => { setEditingNotification(undefined); setIsModalOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          + Add Notification
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex">
          <button onClick={() => setActiveTab("upcoming")} className={`pb-3 px-2 mr-6 text-sm font-semibold transition-colors border-b-2 ${activeTab === "upcoming" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
            Upcoming
          </button>
          <button onClick={() => setActiveTab("all")} className={`pb-3 px-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === "all" ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}>
            All Notifications
          </button>
        </div>
        {activeTab === "upcoming" && (
          <div className="mb-2">
            <select 
              value={upcomingDays} onChange={(e) => setUpcomingDays(Number(e.target.value))} 
              className="text-sm font-medium border-slate-200 rounded-lg p-1 outline-none focus:ring-1 focus:ring-blue-600 text-slate-600"
            >
              <option value={5}>Within 5 Days</option>
              <option value={10}>Within 10 Days</option>
              <option value={15}>Within 15 Days</option>
            </select>
          </div>
        )}
      </div>

      {/* List */}
      <section className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 border border-dashed rounded-xl bg-slate-50 text-slate-500">No notifications found for this criteria. 🎉</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} showPayNow={activeTab === "upcoming"} onEdit={(data) => { setEditingNotification(data); setIsModalOpen(true); }} />
            ))}
          </div>
        )}
      </section>

      {isModalOpen && <NotificationForm initialData={editingNotification} onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}