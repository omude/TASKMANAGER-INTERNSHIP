export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "Work" | "Personal" | "Urgent";
  completed: boolean;
}
