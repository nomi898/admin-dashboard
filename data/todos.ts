export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isPriority: boolean;
}

export const initialTodos: Todo[] = [
  {
    id: 1,
    text: "Meeting with CEO",
    completed: false,
    isPriority: false,
  },
  {
    id: 2,
    text: "Pick up kids from school",
    completed: false,
    isPriority: true,
  },
  {
    id: 3,
    text: "Shopping with Brother",
    completed: false,
    isPriority: false,
  },
  {
    id: 4,
    text: "Review with HR",
    completed: true,
    isPriority: false,
  },
  {
    id: 5,
    text: "Going to Dia's School",
    completed: false,
    isPriority: false,
  },
  {
    id: 6,
    text: "Check design files",
    completed: false,
    isPriority: true,
  },
  {
    id: 7,
    text: "Update File",
    completed: false,
    isPriority: false,
  },
];

