"use client";

import React from "react";
import { BellOff } from "lucide-react";
import { NotificationItemType } from "@/types/notification";
import NotificationItem from "./NotificationItem";

interface NotificationListProps {
  notifications: NotificationItemType[];
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
  onDelete,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="bg-[#E2E2E5] border border-gray-300/50 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 mb-3">
          <BellOff className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1">
          No notifications found
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 font-normal max-w-sm">
          You don&apos;t have any notifications matching your current filter or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((item) => (
        <NotificationItem
          key={item.id}
          item={item}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
