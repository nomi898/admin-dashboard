export interface Contact {
  id: number;
  name: string;
  email: string;
  image: string;
  phone?: string;
  address?: string;
}

export const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Jason Price",
    email: "kuhlman.jermey@yahoo.com",
    image: "/Products/Image.svg",
    phone: "+1 234-567-8900",
    address: "123 Main Street, New York",
  },
  {
    id: 2,
    name: "Duane Dean",
    email: "rusty.botsford@wilfrid.io",
    image: "/Products/Image.svg",
    phone: "+1 234-567-8901",
    address: "456 Oak Avenue, Los Angeles",
  },
  {
    id: 3,
    name: "Jonathan Barker",
    email: "cora.haley@quinn.biz",
    image: "/Products/Image.svg",
    phone: "+1 234-567-8902",
    address: "789 Pine Road, Chicago",
  },
  {
    id: 4,
    name: "Rosie Glover",
    email: "lockman.marques@hotmail.com",
    image: "/Products/Image.svg",
    phone: "+1 234-567-8903",
    address: "321 Elm Street, Houston",
  },
  {
    id: 5,
    name: "Patrick Greer",
    email: "pearlie.eichmann@trevion.net",
    image: "/Products/Image.svg",
    phone: "+1 234-567-8904",
    address: "654 Maple Drive, Phoenix",
  },
  {
    id: 6,
    name: "Darrell Ortega",
    email: "chaya.shields@ferry.info",
    image: "/Products/Image.svg",
    phone: "+1 234-567-8905",
    address: "987 Cedar Lane, Philadelphia",
  },
];

