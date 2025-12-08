import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Event, initialEvents } from "@/data/events";

interface CalendarState {
  events: Event[];
  selectedDate: Date;
  currentView: "Day" | "Week" | "Month";
  selectedEvent: Event | null;
}

const initialState: CalendarState = {
  events: initialEvents.map((event, index) => ({
    ...event,
    id: index + 1,
  })),
  selectedDate: new Date(2019, 9, 8), // October 8, 2019
  currentView: "Month",
  selectedEvent: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<Event, "id">>) => {
      const newId = Math.max(...state.events.map((e) => e.id), 0) + 1;
      state.events.push({
        ...action.payload,
        id: newId,
      });
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((e) => e.id !== action.payload);
    },
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
    },
    setCurrentView: (state, action: PayloadAction<"Day" | "Week" | "Month">) => {
      state.currentView = action.payload;
    },
    setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
      state.selectedEvent = action.payload;
    },
    goToToday: (state) => {
      state.selectedDate = new Date();
    },
    navigateMonth: (state, action: PayloadAction<number>) => {
      const newDate = new Date(state.selectedDate);
      newDate.setMonth(newDate.getMonth() + action.payload);
      state.selectedDate = newDate;
    },
  },
});

export const {
  addEvent,
  updateEvent,
  deleteEvent,
  setSelectedDate,
  setCurrentView,
  setSelectedEvent,
  goToToday,
  navigateMonth,
} = calendarSlice.actions;

export default calendarSlice.reducer;

