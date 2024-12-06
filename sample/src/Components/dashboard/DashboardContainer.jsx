import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";
import { Outlet } from "react-router-dom";
import "./DashboardContainer.scss";

const DashboardContainer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleDrawerHover = (hovered) => {
    setIsHovered(hovered);
  };

  const effectiveDrawerOpen = drawerOpen || isHovered;

  return (
    <div className="dashboard-container">
      <Header toggleDrawer={toggleDrawer} />
      <div className="dashboard-content">
        <Drawer 
          drawerOpen={effectiveDrawerOpen} 
          toggleDrawer={toggleDrawer}
          onHover={handleDrawerHover}
        />
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: effectiveDrawerOpen ? "250px" : "90px",
            padding: "16px",
            overflowY: "auto",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </div>
  );
};

export default DashboardContainer;


