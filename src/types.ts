export type Priority = "Low" | "Medium" | "High";
export type Status = "open" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}
