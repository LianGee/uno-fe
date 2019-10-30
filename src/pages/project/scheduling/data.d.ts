export interface Scheduling {
  id: string;
  businessId: number;
  projectId: number;
  start: string;
  end: string;
  title: string;
  description: string;
  type: number;
  priority: number;
  status: number;
  assign: string;
  creator: string;
  createdAt: string;
  updateBy: string;
}
