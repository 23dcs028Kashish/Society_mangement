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
import LockResetIcon from "@mui/icons-material/LockReset"; // icon for Change Password
import ListItemButton from "@mui/material/ListItemButton";

import MemberManagement from "./pages/MemberManagement";
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Maintenance from "./pages/Maintenance"; // ✅ Import
import UserMaintenance from "./pages/UserMaintenance";
import AdminMaintenance from "./pages/AdminMaintenance";
import AdminMemberManagement from "./pages/AdminMemberManagement";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PayMaintenance from "./pages/PayMaintenance";
import UserComplaints from "./pages/UserComplaints";
import AdminComplaints from "./pages/AdminComplaints";
import Events from "./pages/Events";
import AdminEvents from "./pages/AdminEvents";
import Notices from "./pages/Notices";
import Documents from "./pages/Documents";
import UserProfile from "./pages/UserProfile";
import LoadingPage from "./components/LoadingPage";
import ProfileButton from "./components/ProfileButton";
import FinanceDashboard from "./pages/FinanceDashboard";
import Transactions from "./pages/Transactions";


// Admin navigation items
const adminNavItems = [
  { text: "Dashboard", icon: <HomeIcon />, path: "/admin-dashboard" },
  { text: "Member Management", icon: <HomeIcon />, path: "/members" },
  { text: "Maintenance & Billing", icon: <AccountBalanceWalletIcon />, path: "/maintenance" },
  { text: "Finance Dashboard", icon: <ReceiptIcon />, path: "/finance-dashboard" },
  { text: "Transactions", icon: <ReceiptIcon />, path: "/transactions" },
  { text: "Complaint & Service Request", icon: <BuildIcon />, path: "/complaints" },
  { text: "Event & Facility Booking", icon: <EventIcon />, path: "/admin-events" },
  { text: "Notice Board / Communication", icon: <NotificationsIcon />, path: "/notices" },
  { text: "Document Management", icon: <DescriptionIcon />, path: "/documents" },
  { text: "Reports & Analytics", icon: <BarChartIcon />, path: "/reports" },
];

// User navigation items
const userNavItems = [
  { text: "Dashboard", icon: <HomeIcon />, path: "/user-dashboard" },
  { text: "Maintenance & Billing", icon: <AccountBalanceWalletIcon />, path: "/maintenance" },
  { text: "Complaint & Service Request", icon: <BuildIcon />, path: "/complaints" },
  { text: "Event & Facility Booking", icon: <EventIcon />, path: "/events" },
  { text: "Notice Board / Communication", icon: <NotificationsIcon />, path: "/notices" },
  { text: "Document Management", icon: <DescriptionIcon />, path: "/documents" },
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
  const [user, setUser] = useState(() => {
    // Check for existing user data in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showLoading, setShowLoading] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(true);

  const drawerWidth = collapsed ? drawerWidthCollapsed : drawerWidthExpanded;

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const handleProfileClick = () => {
    // Navigate to profile page
    window.location.href = '/profile';
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setIsFirstLogin(false);
  };

  // Determine which navigation items to show based on user role
  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'initial',
                px: 2.5,
              }}
            >
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
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {!user ? (
          <Login setUser={setUser} onLoginSuccess={() => setShowLoading(true)} />
        ) : showLoading ? (
          <LoadingPage onComplete={handleLoadingComplete} />
        ) : (
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
                
                <ProfileButton 
                  user={user}
                  onProfileClick={handleProfileClick}
                  onLogout={handleLogout}
                />

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
                              {/* Admin Routes */}
              {user.role === 'admin' && (
                <>
                  <Route path="/admin-dashboard" element={<AdminDashboard user={user} />} />
                  <Route path="/members" element={<AdminMemberManagement user={user} />} />
                  <Route path="/admin-events" element={<AdminEvents user={user} />} />
                  <Route path="/finance-dashboard" element={<FinanceDashboard user={user} />} />
                  <Route path="/transactions" element={<Transactions user={user} />} />
                  <Route path="/security" element={<Placeholder title="Security & Visitor Management" />} />
                  <Route path="/reports" element={<Placeholder title="Reports & Analytics" />} />
                </>
              )}
                
                {/* User Routes */}
                {user.role === 'resident' && (
                  <Route path="/user-dashboard" element={<UserDashboard user={user} />} />
                )}
                
                              {/* Shared Routes */}
              <Route path="/maintenance" element={
                user.role === 'admin' ? 
                <AdminMaintenance user={user} /> : 
                <UserMaintenance user={user} />
              } />
              <Route path="/complaints" element={
                user.role === 'admin' ? 
                <AdminComplaints user={user} /> : 
                <UserComplaints user={user} />
              } />
              <Route path="/pay-maintenance" element={<PayMaintenance />} />
              <Route path="/events" element={<Events user={user} />} />
              <Route path="/notices" element={<Notices user={user} />} />
              <Route path="/documents" element={<Documents user={user} />} />
              <Route path="/change-password" element={<ChangePassword user={user} />} />
              <Route path="/profile" element={<UserProfile user={user} onLogout={() => {
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
              }} />} />
                
                {/* Default redirect based on role */}
                <Route path="*" element={
                  user.role === 'admin' ? 
                  <AdminDashboard user={user} /> : 
                  <UserDashboard user={user} />
                } />
              </Routes>
            </Box>
          </Box>
        )}
      </Router>
    </ThemeProvider>
  );
}
