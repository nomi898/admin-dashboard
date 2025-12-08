export interface InvoiceItem {
  id: number;
  serialNo: number;
  description: string;
  quantity: number;
  baseCost: number;
  totalCost: number;
}

export interface Invoice {
  id: number;
  invoiceFrom: {
    name: string;
    address: string;
  };
  invoiceTo: {
    name: string;
    address: string;
  };
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
}

export const initialInvoice: Invoice = {
  id: 1,
  invoiceFrom: {
    name: "Virginia Walker",
    address: "9694 Krajcik Locks Suite 635",
  },
  invoiceTo: {
    name: "Austin Miller",
    address: "Brookview",
  },
  invoiceDate: "12 Nov 2019",
  dueDate: "25 Dec 2019",
  items: [
    {
      id: 1,
      serialNo: 1,
      description: "Children Toy",
      quantity: 2,
      baseCost: 20,
      totalCost: 80,
    },
    {
      id: 2,
      serialNo: 2,
      description: "Makeup",
      quantity: 2,
      baseCost: 50,
      totalCost: 100,
    },
    {
      id: 3,
      serialNo: 3,
      description: "Asus Laptop",
      quantity: 5,
      baseCost: 100,
      totalCost: 500,
    },
    {
      id: 4,
      serialNo: 4,
      description: "Iphone X",
      quantity: 4,
      baseCost: 1000,
      totalCost: 4000,
    },
  ],
};

