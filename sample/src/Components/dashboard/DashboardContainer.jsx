import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "../Header/Header";
import Drawer from "../Drawer/Drawer";
import { Outlet } from "react-router-dom";
import "./DashboardContainer.scss";

const DashboardContainer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <div className="dashboard-container">
      <Header toggleDrawer={toggleDrawer} />
      <div className="dashboard-content">
        <Drawer drawerOpen={drawerOpen} />
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: drawerOpen ? "250px" : "90px",
            padding: "16px",
            overflowY: "auto",
            transition: "margin-left 0.3s",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </div>
  );
};

export default DashboardContainer;
