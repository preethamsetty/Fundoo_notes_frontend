import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useNavigate } from "react-router-dom";
import "./Drawer.scss";

const DrawerComponent = ({ drawerOpen, toggleDrawer }) => {
  const navigate = useNavigate();

  return (
    <div className={`dashboard-drawer ${drawerOpen ? "open" : ""}`}>
      <Box className="drawer-content">
        <List>
          <ListItem button onClick={() => navigate("/dashboard/notes")}>
            <ListItemIcon>
              <LightbulbOutlinedIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Notes" />}
          </ListItem>

          <ListItem button onClick={() => navigate("/dashboard/archive")}>
            <ListItemIcon>
              <ArchiveOutlinedIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Archive" />}
          </ListItem>

          <ListItem button onClick={() => navigate("/dashboard/trash")}>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Trash" />}
          </ListItem>

          <ListItem button>
            <ListItemIcon>
              <NotificationsNoneOutlinedIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Notifications" />}
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default DrawerComponent;
