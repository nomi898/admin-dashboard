export interface ProductStock {
  id: number;
  name: string;
  category: string;
  price: number;
  piece: number;
  availableColors: string[];
  image: string;
}

export const initialStock: ProductStock[] = [
  {
    id: 1,
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 690.0,
    piece: 63,
    availableColors: ["#000000", "#808080", "#FFB6C1"],
    image: "/Products/Image.svg",
  },
  {
    id: 2,
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: 190.0,
    piece: 13,
    availableColors: ["#000000", "#FFB6C1", "#87CEEB", "#FFD700"],
    image: "/Products/Image.svg",
  },
  {
    id: 3,
    name: "Women's Dress",
    category: "Fashion",
    price: 640.0,
    piece: 635,
    availableColors: ["#800080", "#87CEEB", "#00008B", "#4169E1"],
    image: "/Products/Image.svg",
  },
  {
    id: 4,
    name: "Samsung A50",
    category: "Mobile",
    price: 400.0,
    piece: 67,
    availableColors: ["#00008B", "#000000", "#8B0000"],
    image: "/Products/Image.svg",
  },
  {
    id: 5,
    name: "Camera",
    category: "Electronic",
    price: 420.0,
    piece: 52,
    availableColors: ["#00008B", "#000000", "#8B0000"],
    image: "/Products/Image.svg",
  },
  {
    id: 6,
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: 190.0,
    piece: 13,
    availableColors: ["#000000", "#FFB6C1", "#87CEEB", "#FFD700"],
    image: "/Products/Image.svg",
  },
  {
    id: 7,
    name: "Women's Dress",
    category: "Fashion",
    price: 640.0,
    piece: 635,
    availableColors: ["#800080", "#87CEEB", "#00008B", "#4169E1"],
    image: "/Products/Image.svg",
  },
  {
    id: 8,
    name: "iPhone 13",
    category: "Mobile",
    price: 999.0,
    piece: 45,
    availableColors: ["#000000", "#FFFFFF", "#FF0000"],
    image: "/Products/Image.svg",
  },
  {
    id: 9,
    name: "Laptop",
    category: "Electronic",
    price: 1200.0,
    piece: 28,
    availableColors: ["#000000", "#808080", "#FFFFFF"],
    image: "/Products/Image.svg",
  },
];

export const categories = [
  "Digital Product",
  "Fashion",
  "Mobile",
  "Electronic",
  "Book",
  "Watch",
];

