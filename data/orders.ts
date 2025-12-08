export interface Order {
  id: number;
  name: string;
  address: string;
  date: string;
  type: OrderType;
  status: OrderStatus;
}

export type OrderType =
  | "Health & Medicine"
  | "Book & Stationary"
  | "Services & Industry"
  | "Fashion & Beauty"
  | "Home & Living"
  | "Electronics"
  | "Mobile & Phone"
  | "Accessories"
  | "Electric"
  | "Book"
  | "Medicine"
  | "Mobile"
  | "Watch";

export type OrderStatus =
  | "Completed"
  | "Processing"
  | "Rejected"
  | "On Hold"
  | "In Transit";

export const orders: Order[] = [
  {
    id: 1,
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "04 Sep 2019",
    type: "Electric",
    status: "Completed",
  },
  {
    id: 2,
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "28 May 2019",
    type: "Book",
    status: "Processing",
  },
  {
    id: 3,
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "23 Nov 2019",
    type: "Medicine",
    status: "Rejected",
  },
  {
    id: 4,
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "05 Feb 2019",
    type: "Mobile",
    status: "Completed",
  },
  {
    id: 5,
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "29 Jul 2019",
    type: "Watch",
    status: "Processing",
  },
  {
    id: 6,
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "15 Aug 2019",
    type: "Medicine",
    status: "Completed",
  },
  {
    id: 7,
    name: "Maggie Sullivan",
    address: "New Scottieberg",
    date: "21 Dec 2019",
    type: "Watch",
    status: "Processing",
  },
  {
    id: 8,
    name: "Rosie Todd",
    address: "New Jon",
    date: "30 Apr 2019",
    type: "Medicine",
    status: "On Hold",
  },
  {
    id: 9,
    name: "Dollie Hines",
    address: "124 Lyla Forge Suite 975",
    date: "09 Jan 2019",
    type: "Book",
    status: "In Transit",
  },
  {
    id: 10,
    name: "John Smith",
    address: "123 Main Street",
    date: "14 Feb 2019",
    type: "Electronics",
    status: "Completed",
  },
  {
    id: 11,
    name: "Jane Doe",
    address: "456 Oak Avenue",
    date: "14 Feb 2019",
    type: "Mobile & Phone",
    status: "Processing",
  },
  {
    id: 12,
    name: "Bob Johnson",
    address: "789 Pine Road",
    date: "14 Feb 2019",
    type: "Fashion & Beauty",
    status: "Completed",
  },
  {
    id: 13,
    name: "Alice Williams",
    address: "321 Elm Street",
    date: "13 Feb 2019",
    type: "Home & Living",
    status: "Processing",
  },
  {
    id: 14,
    name: "Charlie Brown",
    address: "654 Maple Drive",
    date: "12 Feb 2019",
    type: "Health & Medicine",
    status: "Rejected",
  },
  {
    id: 15,
    name: "Diana Prince",
    address: "987 Cedar Lane",
    date: "11 Feb 2019",
    type: "Book & Stationary",
    status: "In Transit",
  },
];

export const orderTypes: OrderType[] = [
  "Health & Medicine",
  "Book & Stationary",
  "Services & Industry",
  "Fashion & Beauty",
  "Home & Living",
  "Electronics",
  "Mobile & Phone",
  "Accessories",
];

export const orderStatuses: OrderStatus[] = [
  "Completed",
  "Processing",
  "Rejected",
  "On Hold",
  "In Transit",
];

