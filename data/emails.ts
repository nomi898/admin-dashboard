export interface Email {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  isStarred: boolean;
  isRead: boolean;
  label?: "Primary" | "Social" | "Work" | "Friends";
  folder?: "Inbox" | "Sent" | "Draft" | "Bin" | "Spam";
  to?: string;
  body?: string;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
  isOwn: boolean;
}

export const emails: Email[] = [
  {
    id: 1,
    sender: "Jullu Jalal",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "8:38 AM",
    isStarred: false,
    isRead: false,
    label: "Primary",
  },
  {
    id: 2,
    sender: "Minerva Barnett",
    subject: "Get Best Advertiser In Your Side Pocket",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "8:13 AM",
    isStarred: false,
    isRead: false,
    label: "Work",
  },
  {
    id: 3,
    sender: "Peter Lewis",
    subject: "Vacation Home Rental Success",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "7:52 PM",
    isStarred: false,
    isRead: false,
    label: "Friends",
  },
  {
    id: 4,
    sender: "Anthony Briggs",
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "7:52 PM",
    isStarred: true,
    isRead: false,
  },
  {
    id: 5,
    sender: "Clifford Morgan",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "4:13 PM",
    isStarred: false,
    isRead: true,
    label: "Social",
  },
  {
    id: 6,
    sender: "Cecilia Webster",
    subject: "Always Look On The Bright Side Of Life",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "3:52 PM",
    isStarred: false,
    isRead: true,
    label: "Friends",
  },
  {
    id: 7,
    sender: "Harvey Manning",
    subject: "Curling Irons Are As Individual As The Women Who Use Them",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "2:30 PM",
    isStarred: true,
    isRead: false,
  },
  {
    id: 8,
    sender: "Willie Blake",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "8:38 AM",
    isStarred: false,
    isRead: false,
    label: "Primary",
  },
  {
    id: 9,
    sender: "Fanny Weaver",
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "7:52 PM",
    isStarred: true,
    isRead: false,
  },
  {
    id: 10,
    sender: "Olga Hogan",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "4:13 PM",
    isStarred: false,
    isRead: true,
    label: "Social",
  },
  {
    id: 11,
    sender: "Lora Houston",
    subject: "Vacation Home Rental Success",
    preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    time: "7:52 PM",
    isStarred: false,
    isRead: false,
    label: "Friends",
  },
  {
    id: 12,
    sender: "John Doe",
    subject: "Meeting Tomorrow",
    preview: "Don't forget about our meeting tomorrow at 10 AM...",
    time: "1:15 PM",
    isStarred: false,
    isRead: true,
    label: "Work",
  },
];

export const getMessagesForEmail = (emailId: number): Message[] => {
  // Mock messages for a conversation
  return [
    {
      id: 1,
      sender: emails.find(e => e.id === emailId)?.sender || "Sender",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "6:30 PM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
      time: "6:34 PM",
      isOwn: true,
    },
    {
      id: 3,
      sender: emails.find(e => e.id === emailId)?.sender || "Sender",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
      time: "6:38 PM",
      isOwn: false,
    },
  ];
};

