import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faBell,
  faPencilAlt,
  faArchive,
  faTrash,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import TakeNote from "../TakeNote/TakeNote";  // Importing TakeNote component
import "../dashboard/DashboardContainer.scss";

const DashboardComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Notes"); // Tracks the active menu item
  const [searchText, setSearchText] = useState("");

  const menuItems = [
    { icon: faLightbulb, label: "Notes" },
    { icon: faBell, label: "Reminders" },
    { icon: faPencilAlt, label: "Edit labels" },
    { icon: faArchive, label: "Archive" },
    { icon: faTrash, label: "Trash" },
  ];

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemClick = (label) => {
    setActiveItem(label); // Update the active item
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <button className="menu-button" onClick={handleDrawerToggle}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className="search-bar">
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </div>
      </header>

      {/* Material-UI Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: "250px",
            boxSizing: "border-box",
            marginTop: "60px",
            height: "calc(100vh - 60px)",
            borderRight: "1px solid #ddd",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleMenuItemClick(item.label)}
              className={activeItem === item.label ? "active-menu-item" : ""}
            >
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{
                    color: activeItem === item.label ? "#d4a017" : "#666", // Dark yellow for active item
                    fontSize: "18px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  style: {
                    color: activeItem === item.label ? "#000" : "#333",
                    fontWeight: activeItem === item.label ? "bold" : "normal",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Section */}
      <div className="dashboard-content">
        {activeItem === "Notes" && <TakeNote />} {/* Render TakeNote only when "Notes" is active */}
      </div>
    </div>
  );
};

export default DashboardComponent;
