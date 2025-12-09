"use client";
import React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ReactCountryFlag from "react-country-flag";
import { useRouter } from "next/navigation";

// Styled search components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "19px",
  backgroundColor: "#f5f6fa",
  "&:hover": {
    backgroundColor: "#D5D5D5",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "388px",
    },
  },
}));

const Appbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const router = useRouter();
  // Admin menu state
  const [profileAnchor, setProfileAnchor] = React.useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(null);

  const handleProfileOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleNotifOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => setNotifAnchor(null);

  // Mobile menu
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 16 new notifications" color="inherit">
          <Badge badgeContent={16} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
    </Menu>
  );

  // Language menu
  const [langMenu, setLangMenu] = React.useState<null | HTMLElement>(null);
  const [language, setLanguage] = React.useState({ code: "en", country: "GB", label: "English" });

  const openLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setLangMenu(event.currentTarget);
  };
  const closeLangMenu = () => setLangMenu(null);
  const changeLanguage = (code: string) => {
    if (code === "en") setLanguage({ code: "en", country: "GB", label: "English" });
    if (code === "de") setLanguage({ code: "de", country: "DE", label: "German" });
    closeLangMenu();
  };

  const languageMenu = (
    <Menu anchorEl={langMenu} open={Boolean(langMenu)} onClose={closeLangMenu}>
      <MenuItem onClick={() => changeLanguage("en")}>
        <ReactCountryFlag countryCode="GB" svg style={{ width: "1.5em", marginRight: 8,color:'#000' }} />
        English
      </MenuItem>
      <MenuItem onClick={() => changeLanguage("de")}>
        <ReactCountryFlag countryCode="DE" svg style={{ width: "1.5em", marginRight: 8,color:'#000'  }} />
        German
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "#ffffff" }}>
        <Toolbar>
          {/* Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "inline-flex", lg: "none" } }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>

          {/* Search */}
          <Search sx={{ display: { xs: "none", sm: "block" } }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#8b8c8f" }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search", sx: { color: "#000" } }} />
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Icons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {/* Notifications */}
            <IconButton
              size="large"
              aria-label="show 16 new notifications"
              color="inherit"
              onClick={handleNotifOpen}
            >
              <Badge badgeContent={16} color="error">
                <NotificationsIcon sx={{ color: "#4980ff" }} />
              </Badge>
            </IconButton>

            {/* Language */}
            <IconButton onClick={openLangMenu} color="inherit" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ReactCountryFlag countryCode={language.country} svg style={{ width: "1.5em" }} />
              <Typography variant="body2" sx={{ color: "#000" }}>{language.label}</Typography>
            </IconButton>

            {/* Profile */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Stack direction="row" spacing={2}>
                <Avatar alt="Moni Roy" src="/Product/Image.svg" />
              </Stack>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, cursor: "pointer" }}>
                <Box>
                  <Typography sx={{ fontWeight: 600, color: "#000" }}>Moni Roy</Typography>
                  <Typography variant="caption" sx={{ color: "#000" }}>
                    Admin
                  </Typography>
                </Box>
                <IconButton onClick={handleProfileOpen} size="small">
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>

              {/* Admin Dropdown Menu */}
              <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={handleProfileClose}>
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    router.push("/Account/manage");
                  }}
                >
                  Manage Account
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    router.push("/Account/password");
                  }}
                >
                  Change Password
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    router.push("/Account/activity");
                  }}
                >
                  Activity Log
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleProfileClose();
                    router.push("/Logout");
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menus */}
      {languageMenu}
      {renderMobileMenu}
      <Menu anchorEl={notifAnchor} open={Boolean(notifAnchor)} onClose={handleNotifClose}>
        <MenuItem disabled>
          <Typography variant="subtitle2">Notification</Typography>
        </MenuItem>
        <Divider />
        {[
          { label: "Settings", desc: "Update Dashboard" },
          { label: "Event Update", desc: "An event date update" },
          { label: "Profile", desc: "Update your profile" },
          { label: "Application Error", desc: "Check your running app" },
        ].map((n, idx) => (
          <MenuItem key={idx} onClick={handleNotifClose} sx={{ display: "block" }}>
            <Typography sx={{ fontWeight: 600 }}>{n.label}</Typography>
            <Typography variant="caption" sx={{ color: "#555" }}>
              {n.desc}
            </Typography>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleNotifClose}>
          <Typography variant="body2" sx={{ color: "#4980ff" }}>
            See all notification
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Appbar;
