"use client";

import React, { useState, useMemo } from "react";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import Sidebar from "@/Components/Sidebar";
import Appbar from "@/Components/Appbar";

const drawerWidth = 250;

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useMediaQuery("(min-width:1024px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Ensure drawer closes on breakpoint change
  React.useEffect(() => {
    if (isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  const sidebarContent = useMemo(
    () => <Sidebar onNavigate={() => setDrawerOpen(false)} />,
    []
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      {isDesktop ? (
        <Box
          component="nav"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            borderRight: "1px solid #ddd",
            bgcolor: "#fff",
          }}
        >
          {sidebarContent}
        </Box>
      ) : (
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Right side */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flexShrink: 0 }}>
          <Appbar onMenuClick={() => setDrawerOpen(true)} />
        </Box>
        <Box
          sx={{
            flex: 1,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 3 },
            bgcolor: "#f9f9f9",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default LayoutShell;

