'use client'
import Image from "next/image";
import logo from "@/public/Logo.svg";
import { Box, List, ListItem, ListItemText, Divider, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Next.js App Router
import Product from '@/public/sidebar/Product.svg'
import Dashboard from '@/public/sidebar/Dashboard.svg'
import Calender from '@/public/sidebar/Calender.svg'
import Contact from '@/public/sidebar/Contact.svg'
import Favourites from '@/public/sidebar/Favourites.svg'
import Inbox from '@/public/sidebar/Inbox.svg'
import Invoice from '@/public/sidebar/Invoice.svg'
import Logout from '@/public/sidebar/Logout.svg'
import OrderList from '@/public/sidebar/OrderList.svg'
import Pricing from '@/public/sidebar/Pricing.svg'
import Productstock from '@/public/sidebar/Productstock.svg'
import Settings from '@/public/sidebar/Settings.svg'
import Table from '@/public/sidebar/Table.svg'
import Team from '@/public/sidebar/Team.svg'
import Todo from '@/public/sidebar/Todo.svg'
import Uielement from '@/public/sidebar/Uielements.svg'

const SidebarSection = ({ title, items }: { title?: string; items: { name: string; link: string; image:any; }[] }) => {
  const pathname = usePathname(); // get current route

  return (
    <Box sx={{ width: "100%", mt: title ? 2 : 0 }}>
      {title && (
        <Typography sx={{ ml: 2, mb: 1, fontWeight: 600, fontSize: 12 }} variant="subtitle2">
          {title}
        </Typography>
      )}
      <List sx={{ p: 0 }}>
        {items.map((item, index) => {
          const isActive = pathname === item.link; // check if current route
          return (
            <ListItem
              key={index}
              component={Link}
              href={item.link}
              sx={{
                textDecoration: "none",
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "#fff" : "inherit",
                "&:hover": {
                  bgcolor: isActive ? "primary.dark" : "action.hover",
                },
                borderRadius: 0,
                py: 1, 
                px: 2, 
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1, // space between image placeholder and text
              }}
            >
              {/* Placeholder for future image/icon
              <Box sx={{ width: 24, height: 24, bgcolor: "#000", borderRadius: 0 }} /> */}
              <Image src={item.image}
              alt={''}
              />            
              <ListItemText primary={item.name} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

const Sidebar = () => {
  const topitems = [
    { name: "Dashboard", link: "/",image: Dashboard },
    { name: "Products", link: "/Products",image: Product},
    { name: "Favorites", link: "/Favorites",image: Favourites },
    { name: "Inbox", link: "/Inbox",image: Inbox },
    { name: "Order Lists", link: "/Orderlists",image: OrderList },
    { name: "Product Stock", link: "/Productstock",image:Productstock },
  ];
  
  const pagesitems = [
    { name: "Pricing", link: "/Pricing", image: Pricing },
    { name: "Calender", link: "/Calender",image: Calender },
    { name: "To-do", link: "/Todo",image: Todo },
    { name: "Contact", link: "/Contact",image: Contact },
    { name: "Invoice", link: "/Invoice",image: Invoice },
    { name: "UI Elements", link: "/UiElements",image: Uielement },
    { name: "Team", link: "/Team",image: Team },
    { name: "Table", link: "/Table",image: Table },
  ];
  const bottomitems = [
    { name: "Setting", link: "/Setting",image: Settings },
    { name: "Logout", link: "/Logout",image: Logout },
  ];

  return (
    <Box sx={{ width: 250, bgcolor: "#fff", minHeight: "100vh", borderRight: "1px solid #ddd" }}>
      {/* Logo */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 2 }}>
        <Image src={logo} alt="Logo" width={150} height={50} />
      </Box>

      {/* Sidebar Sections */}
      <SidebarSection items={topitems} />
      <Divider />
      <SidebarSection title="PAGES" items={pagesitems} />
      <Divider />
      <SidebarSection items={bottomitems} />
    </Box>
  );
};

export default Sidebar;
