import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import "./Drawer.scss";

const DrawerComponent = ({ drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define routes and labels for the drawer
  const routes = [
    { path: "/dashboard/notes", label: "Notes", Icon: LightbulbOutlinedIcon },
    { path: "/dashboard/archive", label: "Archive", Icon: ArchiveOutlinedIcon },
    { path: "/dashboard/trash", label: "Trash", Icon: DeleteOutlineOutlinedIcon },
  ];

  return (
    <div className={`dashboard-drawer ${drawerOpen ? "open" : ""}`}>
      <Box className="drawer-content">
        <List>
          {routes.map(({ path, label, Icon }) => (
            <ListItem
              key={path}
              button
              onClick={() => navigate(path)}
              className={location.pathname === path ? "active" : ""}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              {drawerOpen && <ListItemText primary={label} />}
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default DrawerComponent;
