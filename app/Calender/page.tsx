"use client";

import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addEvent,
  deleteEvent,
  setSelectedDate,
  setCurrentView,
  setSelectedEvent,
  goToToday,
  navigateMonth,
} from "@/store/calendarSlice";
import { Event } from "@/data/events";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Clock,
  Users,
  User,
} from "lucide-react";
import Image from "next/image";

const CalendarPage = () => {
  const dispatch = useAppDispatch();
  const { events, selectedDate, currentView, selectedEvent } = useAppSelector(
    (state) => state.calendar
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    date: new Date(),
    time: "",
    location: "",
    organizer: "",
    attendees: 0,
    attendeeAvatars: [],
    color: "#A78BFA",
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      const checkDate = new Date(date);
      return (
        eventDate.getDate() === checkDate.getDate() &&
        eventDate.getMonth() === checkDate.getMonth() &&
        eventDate.getFullYear() === checkDate.getFullYear()
      );
    });
  };

  // Check if event spans multiple days
  const isEventSpanning = (event: Event, date: Date) => {
    if (!event.endDate) return false;
    const eventStart = new Date(event.date);
    const eventEnd = new Date(event.endDate);
    const checkDate = new Date(date);
    return checkDate >= eventStart && checkDate <= eventEnd;
  };

  // Get calendar days
  const calendarDays = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];

    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i));
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }, [selectedDate]);

  // Get upcoming events (next 4)
  const upcomingEvents = useMemo(() => {
    const today = new Date();
    return events
      .filter((event) => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 4);
  }, [events]);

  const formatEventDate = (date: Date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const isToday =
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear();

    if (isToday) {
      return "Today";
    }

    return `${eventDate.getDate()} ${monthNames[eventDate.getMonth()]} ${eventDate.getFullYear()}`;
  };

  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    const eventsForDate = getEventsForDate(date);
    if (eventsForDate.length > 0) {
      dispatch(setSelectedEvent(eventsForDate[0]));
    } else {
      setFormData({
        ...formData,
        date: date,
      });
      setIsAddModalOpen(true);
    }
  };

  const handleEventClick = (event: Event) => {
    dispatch(setSelectedEvent(event));
  };

  const handleAddEvent = () => {
    if (!formData.title || !formData.time || !formData.location) {
      alert("Please fill in all required fields");
      return;
    }

    dispatch(
      addEvent({
        title: formData.title!,
        date: formData.date || new Date(),
        endDate: formData.endDate,
        time: formData.time!,
        location: formData.location!,
        organizer: formData.organizer || "You",
        attendees: formData.attendees || 0,
        attendeeAvatars: formData.attendeeAvatars || [],
        color: formData.color || "#A78BFA",
      })
    );

    setIsAddModalOpen(false);
    setFormData({
      title: "",
      date: new Date(),
      time: "",
      location: "",
      organizer: "",
      attendees: 0,
      attendeeAvatars: [],
      color: "#A78BFA",
    });
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvent(selectedEvent.id));
      dispatch(setSelectedEvent(null));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-full lg:w-80 bg-white border-r border-b lg:border-b-0 border-gray-200 p-4 sm:p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4 sm:mb-6">Calender</h1>

        {/* Add New Event Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg mb-6 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Event
        </button>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-lg font-semibold mb-4">You are going to</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <Image
                      src={event.image || "/Products/Image.svg"}
                      alt={event.title}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {formatEventDate(event.date)} at {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {event.attendeeAvatars.slice(0, 3).map((avatar, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                          >
                            <Image
                              src={avatar}
                              alt={`Attendee ${index + 1}`}
                              width={24}
                              height={24}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        +{event.attendees}+
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {upcomingEvents.length > 0 && (
            <button className="w-full mt-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              See More
            </button>
          )}
        </div>
      </div>

      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col p-4 sm:p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3">
          <button
            onClick={() => dispatch(goToToday())}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Today
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(navigateMonth(-1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold min-w-[200px] text-center">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h2>
            <button
              onClick={() => dispatch(navigateMonth(1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {(["Day", "Week", "Month"] as const).map((view) => (
              <button
                key={view}
                onClick={() => dispatch(setCurrentView(view))}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === view
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-lg p-4 sm:p-6 overflow-auto">
          {currentView === "Month" && (
            <div>
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((date, index) => {
                  const isCurrentMonth = date && date.getMonth() === selectedDate.getMonth();
                  const isToday =
                    date &&
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();

                  const dayEvents = date ? getEventsForDate(date) : [];
                  const spanningEvents = date
                    ? events.filter((e) => isEventSpanning(e, date))
                    : [];

                  return (
                    <div
                      key={index}
                      onClick={() => handleDateClick(date)}
                      className={`min-h-[100px] p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                        !isCurrentMonth ? "bg-gray-50 opacity-50" : ""
                      } ${isToday ? "ring-2 ring-blue-500" : ""}`}
                    >
                      <div
                        className={`text-sm font-medium mb-1 ${
                          isToday ? "text-blue-600" : "text-gray-700"
                        }`}
                      >
                        {date?.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event);
                            }}
                            className="text-xs px-2 py-1 rounded text-white truncate"
                            style={{ backgroundColor: event.color }}
                          >
                            {event.title}
                          </div>
                        ))}
                        {spanningEvents
                          .filter((e) => !dayEvents.find((de) => de.id === e.id))
                          .map((event) => (
                            <div
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                              }}
                              className="text-xs px-2 py-1 rounded text-white truncate opacity-75"
                              style={{ backgroundColor: event.color }}
                            >
                              {event.title}
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="relative">
              <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                <Image
                  src={selectedEvent.image || "/Products/Image.svg"}
                  alt={selectedEvent.title}
                  width={400}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <button
                onClick={() => dispatch(setSelectedEvent(null))}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5" />
                  <span>{selectedEvent.organizer}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>
                    {formatEventDate(selectedEvent.date)} at {selectedEvent.time}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {selectedEvent.attendeeAvatars.slice(0, 3).map((avatar, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                        >
                          <Image
                            src={avatar}
                            alt={`Attendee ${index + 1}`}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm">+{selectedEvent.attendees}+ attendees</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleDeleteEvent}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Add New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={
                      formData.date
                        ? new Date(formData.date).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      setFormData({ ...formData, date: new Date(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    value={formData.time || ""}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location || ""}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organizer</label>
                <input
                  type="text"
                  value={formData.organizer || ""}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter organizer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <input
                  type="color"
                  value={formData.color || "#A78BFA"}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 mt-6">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;

