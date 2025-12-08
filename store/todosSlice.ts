import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, initialTodos } from "@/data/todos";

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: initialTodos,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newId = Math.max(...state.todos.map((t) => t.id), 0) + 1;
      state.todos.push({
        id: newId,
        text: action.payload,
        completed: false,
        isPriority: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    togglePriority: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.isPriority = !todo.isPriority;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  togglePriority,
  deleteTodo,
  updateTodo,
  setTodos,
} = todosSlice.actions;

export default todosSlice.reducer;

