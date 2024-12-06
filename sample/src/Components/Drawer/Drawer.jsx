import React, { useState } from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import Label from "../Labels/Label";
import "./Drawer.scss";

const DrawerComponent = ({ drawerOpen, toggleDrawer, onHover }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLabelModal, setShowLabelModal] = useState(false);
  const [customLabels, setCustomLabels] = useState([]);

  const baseRoutes = [
    { path: "/dashboard/notes", label: "Notes", Icon: LightbulbOutlinedIcon },
    { path: "/dashboard/archive", label: "Archive", Icon: ArchiveOutlinedIcon },
    { path: "/dashboard/trash", label: "Trash", Icon: DeleteOutlineOutlinedIcon },
  ];

  const handleEditLabelsClick = () => {
    setShowLabelModal(true);
  };

  const handleLabelModalClose = () => {
    setShowLabelModal(false);
  };

  const handleLabelSave = (newLabels) => {
    setCustomLabels(newLabels);
    setShowLabelModal(false);
  };

  const allRoutes = [
    ...baseRoutes,
    { path: "/dashboard/edit-labels", label: "Edit labels", Icon: EditOutlinedIcon, onClick: handleEditLabelsClick },
    ...customLabels.map(label => ({
      path: `/dashboard/label/${label.id}`,
      label: label.name,
      Icon: LabelOutlinedIcon
    }))
  ];

  return (
    <>
      <div 
        className={`dashboard-drawer ${drawerOpen ? "open" : ""}`}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <Box className="drawer-content">
          <List>
            {allRoutes.map(({ path, label, Icon, onClick }) => (
              <ListItem
                key={path}
                button
                onClick={onClick || (() => navigate(path))}
                className={location.pathname === path ? "active" : ""}
              >
                <ListItemIcon className="icon-container">
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} className="label-text" />
              </ListItem>
            ))}
          </List>
        </Box>
      </div>
      {showLabelModal && (
        <Label
          onClose={handleLabelModalClose}
          onSave={handleLabelSave}
          existingLabels={customLabels}
        />
      )}
    </>
  );
};

export default DrawerComponent;



