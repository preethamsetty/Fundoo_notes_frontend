import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import ViewListIcon from "@mui/icons-material/ViewList";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import { UpdateQueryContext } from "../Hooks/SearchHook";

const Header = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const updateQuery = useContext(UpdateQueryContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleMenuClose();
    navigate("/");
  };

  const handlePageRefresh = () => {
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      className="header"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        color: "black",
        width: "100vw",
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={toggleDrawer} sx={{ marginLeft: "6px" }}>
            <MenuIcon />
          </IconButton>
          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="Logo"
            style={{ width: 30, height: 30, marginRight: 8 }}
          />
          <Typography variant="h6" color="#5f6368" sx={{ fontWeight: "bold" }}>
            Fundoo-Notes
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            marginLeft: 3,
            marginRight: 3,
            maxWidth: 500,
            backgroundColor: "#f1f3f4",
            borderRadius: "8px",
            paddingLeft: 2,
          }}
        >
          <SearchIcon />
          <InputBase
            placeholder="Search"
            onChange={(e) => {
              updateQuery(e.currentTarget.value);
              console.log(e.currentTarget.value);
            }}
            fullWidth
            sx={{ paddingLeft: 1, fontSize: "0.9rem", height: "50px" }}
          />
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={handlePageRefresh}>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <ViewListIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
          {/* Profile Icon */}
          <IconButton onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

