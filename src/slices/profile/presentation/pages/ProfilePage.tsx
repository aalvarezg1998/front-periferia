import React from "react";
import {
  Container,
  Alert,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
  Stack
} from "@mui/material";
import { AccountCircle, Email } from "@mui/icons-material";
import { useAuth } from "../../../shared/context/AppContext";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" style={{ marginTop: 50 }}>
        <Alert severity="warning" style={{ marginBottom: 20 }}>
          Debes iniciar sesión para ver esta página.
        </Alert>
        <Button variant="contained" color="primary" href="/login">
          Ir a Login
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <Card sx={{ maxWidth: "100%", mb: 2, borderRadius: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={user?.profilePicture ?? ""}
              alt={user?.fullName}
              sx={{ width: 80, height: 80 }}
            >
              {user?.profilePicture ? "" : user?.fullName?.charAt(0)}
            </Avatar>
            <Stack spacing={1}>
              <Typography variant="h4">{user?.fullName}</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccountCircle />
                <Typography>{user?.username}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Email />
                <Typography>{user?.email}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
