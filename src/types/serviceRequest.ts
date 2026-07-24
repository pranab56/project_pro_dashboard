export type PriorityType = "Urgent" | "High" | "Medium" | "Low";
export type StatusType = "In Progress" | "Assigned" | "Completed" | "Pending" | "Cancelled";

export interface ServiceRequest {
  id: string;
  title: string;
  property: string;
  address: string;
  priority: PriorityType;
  status: StatusType;
  stage: number;
  stageText: string;
  contractor: string;
  contractorPhone?: string;
  createdDate: string;
  isOccupied?: boolean;
  tenantName?: string;
  tenantPhone?: string;
}
