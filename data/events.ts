export interface Event {
  id: number;
  title: string;
  date: Date;
  endDate?: Date;
  time: string;
  location: string;
  organizer: string;
  attendees: number;
  attendeeAvatars: string[];
  color: string;
  image?: string;
}

export const initialEvents: Omit<Event, "id">[] = [
  {
    title: "Design Conference",
    date: new Date(2019, 9, 8), // October 8, 2019
    time: "07:19 AM",
    location: "56 Davion Mission Suite 157 Meaghanberg",
    organizer: "Zillul Design Agency",
    attendees: 15,
    attendeeAvatars: ["/Products/Image.svg", "/Products/Image.svg", "/Products/Image.svg"],
    color: "#A78BFA", // Light purple
  },
  {
    title: "Weekend Festival",
    date: new Date(2019, 9, 16), // October 16, 2019
    time: "5:00 PM",
    location: "853 Moore Flats Suite 158 Sweden",
    organizer: "Festival Organizers",
    attendees: 20,
    attendeeAvatars: ["/Products/Image.svg", "/Products/Image.svg", "/Products/Image.svg"],
    color: "#F9A8D4", // Light pink
  },
  {
    title: "Glastonbury Festival",
    date: new Date(2019, 9, 20), // October 20, 2019
    endDate: new Date(2019, 9, 22), // October 22, 2019
    time: "8:00 PM",
    location: "646 Walter Read Apt. 571 Turks and Caicos Islands",
    organizer: "Glastonbury Team",
    attendees: 12,
    attendeeAvatars: ["/Products/Image.svg", "/Products/Image.svg", "/Products/Image.svg"],
    color: "#FB923C", // Orange
  },
  {
    title: "Ultra Europe 2019",
    date: new Date(2019, 9, 25), // October 25, 2019
    time: "10:00 PM",
    location: "506 Satterfield Tunnel Apt. 963 San Marino",
    organizer: "Ultra Europe",
    attendees: 42,
    attendeeAvatars: ["/Products/Image.svg", "/Products/Image.svg", "/Products/Image.svg"],
    color: "#60A5FA", // Light blue
  },
];

