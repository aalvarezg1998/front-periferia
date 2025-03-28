import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AppContext";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

const Navigation: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
    {isAuthenticated ? <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/publications"
          sx={{
            flexGrow: 1,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Social Periferia
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button color="inherit" component={RouterLink} to="/publications" title="Publicaciones">
            Publicaciones
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile" title={user?.username}>
            <Avatar sx={{ width: 32, height: 32 }} alt={user?.profilePicture} src={user?.profilePicture}/>
          </Button>
          <Button color="inherit" onClick={handleLogout} title="Cerrar sesión">
            <PowerSettingsNewIcon />
          </Button>
        </Box>
      </Toolbar>
    </AppBar> : null}
    </>
  );
};

export default Navigation;
