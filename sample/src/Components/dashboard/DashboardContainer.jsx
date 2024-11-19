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
import "../dashboard/DashboardContainer.scss";

const DashboardComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const menuItems = [
    { icon: faLightbulb, label: "Notes", isActive: true },
    { icon: faBell, label: "Reminders" },
    { icon: faPencilAlt, label: "Edit labels" },
    { icon: faArchive, label: "Archive" },
    { icon: faTrash, label: "Trash" },
  ];

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
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
            marginTop: "60px", // Push the drawer below the header
            height: "calc(100vh - 60px)", // Restrict the height to fit below the header
            borderRight: "1px solid #ddd",
          },
        }}
      >
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{
                backgroundColor: item.isActive ? "#fdf4e3" : "transparent",
                "&:hover": {
                  backgroundColor: "#f6f6f6",
                },
                padding: "10px 20px",
              }}
            >
              <ListItemIcon>
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{
                    color: item.isActive ? "#ffcc00" : "#666",
                    fontSize: "18px",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  style: {
                    color: item.isActive ? "#000" : "#333",
                    fontWeight: item.isActive ? "bold" : "normal",
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content area
      <div
        className={`content-wrapper ${isDrawerOpen ? "drawer-open" : ""}`}
      >
        <h1>Main Content</h1>
        <p>{searchText && `Searching for: ${searchText}`}</p>
      </div> */}
    </div>
  );
};

export default DashboardComponent;
