export interface Requirement {
  id: number;
  projectId: number;
  title: string;
  priority: number;
  type: number;
  assignTo: string[];
  start: string;
  end: string;
  status: number;
  content: string;
  creator: string;
}
