"use client";

import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { initialNotifications } from "@/data/mockNotifications";
import { NotificationCategory, NotificationItemType } from "@/types/notification";
import NotificationHeader from "@/components/notifications/NotificationHeader";
import NotificationFilters from "@/components/notifications/NotificationFilters";
import NotificationList from "@/components/notifications/NotificationList";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItemType[]>(
    initialNotifications
  );
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Unread count
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  // Filtered Notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((n) => {
      // 1. Tab filter
      let matchesTab = true;
      if (activeTab === "unread") {
        matchesTab = !n.read;
      } else if (activeTab !== "all") {
        matchesTab = n.category === activeTab;
      }

      // 2. Search filter
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q);

      return matchesTab && matchesSearch;
    });
  }, [notifications, activeTab, searchTerm]);

  // Actions
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <NotificationHeader
        unreadCount={unreadCount}
        totalCount={notifications.length}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
      />

      {/* Filters & Search */}
      <NotificationFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        unreadCount={unreadCount}
      />

      {/* Notifications List */}
      <NotificationList
        notifications={filteredNotifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
      />
    </div>
  );
}
