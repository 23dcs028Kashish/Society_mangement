import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Switch,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BuildIcon from "@mui/icons-material/Build";
import EventIcon from "@mui/icons-material/Event";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DescriptionIcon from "@mui/icons-material/Description";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BarChartIcon from "@mui/icons-material/BarChart";

import MemberManagement from "./pages/MemberManagement";

const navItems = [
  { text: "Member Management", icon: <HomeIcon />, path: "/members" },
  { text: "Maintenance & Billing", icon: <AccountBalanceWalletIcon />, path: "/maintenance" },
  { text: "Accounting & Finance", icon: <ReceiptIcon />, path: "/accounting" },
  { text: "Complaint & Service Request", icon: <BuildIcon />, path: "/complaints" },
  { text: "Event & Facility Booking", icon: <EventIcon />, path: "/events" },
  { text: "Security & Visitor Management", icon: <SecurityIcon />, path: "/security" },
  { text: "Notice Board / Communication", icon: <NotificationsIcon />, path: "/notices" },
  { text: "Document Management", icon: <DescriptionIcon />, path: "/documents" },
  { text: "Admin Panel", icon: <AdminPanelSettingsIcon />, path: "/admin" },
  { text: "Reports & Analytics", icon: <BarChartIcon />, path: "/reports" },
];

const drawerWidthExpanded = 260;
const drawerWidthCollapsed = 72;

function Placeholder({ title }) {
  return (
    <Box p={3}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1" color="text.secondary">
        This is a placeholder for the {title} module.
      </Typography>
    </Box>
  );
}

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const theme = createTheme({ palette: { mode: darkMode ? "dark" : "light" } });

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const drawerWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? "auto" : 2,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Society Management System
              </Typography>
              <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </Toolbar>
          </AppBar>

          {isMobile ? (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{ "& .MuiDrawer-paper": { width: drawerWidthExpanded } }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                transition: "width 0.3s",
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                  transition: "width 0.3s",
                  overflowX: "hidden",
                },
              }}
            >
              {drawer}
            </Drawer>
          )}

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              transition: "margin 0.3s",
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/members" element={<MemberManagement />} />
              <Route path="/maintenance" element={<Placeholder title="Maintenance & Billing" />} />
              <Route path="/accounting" element={<Placeholder title="Accounting & Finance" />} />
              <Route path="/complaints" element={<Placeholder title="Complaint & Service Request" />} />
              <Route path="/events" element={<Placeholder title="Event & Facility Booking" />} />
              <Route path="/security" element={<Placeholder title="Security & Visitor Management" />} />
              <Route path="/notices" element={<Placeholder title="Notice Board / Communication" />} />
              <Route path="/documents" element={<Placeholder title="Document Management" />} />
              <Route path="/admin" element={<Placeholder title="Admin Panel" />} />
              <Route path="/reports" element={<Placeholder title="Reports & Analytics" />} />
              <Route path="*" element={<Placeholder title="Welcome" />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
