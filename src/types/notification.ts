export type NotificationCategory = "all" | "unread" | "service_request" | "invoice" | "property" | "system";

export interface NotificationItemType {
  id: string;
  title: string;
  message: string;
  category: "service_request" | "invoice" | "property" | "system";
  timestamp: string;
  read: boolean;
  link?: string;
  actionText?: string;
}
