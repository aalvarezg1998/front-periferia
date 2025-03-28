import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { CreatePublicationUseCase } from "../../application/useCases/createPublicationUseCase";
import { PublicationRepository } from "../../infrastructure/repositories/PublicationRepository";
import { useAuth } from "../../../shared/context/AppContext";
import PublicIcon from "@mui/icons-material/Public";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

interface CreatePublicationFormProps {
  onPublicationCreated: () => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreatePublicationForm: React.FC<CreatePublicationFormProps> = ({
  onPublicationCreated,
}) => {
  const [content, setContent] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setError("Solo se permiten archivos JPG, PNG o GIF");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("El archivo no debe superar los 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
        setImagePreview(URL.createObjectURL(file));
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Debes iniciar sesión para crear una publicación");
      return;
    }

    const publicationRepository = new PublicationRepository();
    const createPublicationUseCase = new CreatePublicationUseCase(
      publicationRepository
    );

    try {
      if (imageBase64) {
        await createPublicationUseCase.execute({
          content,
          imageUrl: imageBase64,
          userId: user.id,
          username: user.username,
        });
      } else {
        await createPublicationUseCase.execute({
          content,
          userId: user.id,
          username: user.username,
        });
      }

      onPublicationCreated();
      setContent("");
      setImageBase64(null);
      setImagePreview(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Error al crear publicación"
      );
    }
  };

  const handleRemoveImage = () => {
    setImageBase64(null);
    setImagePreview(null);
  };

  return (
    <Container maxWidth="sm" sx={{ borderRadius: 20 }}>
      <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
        <Typography
          variant="h6"
          component="h5"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          Crear publicación
        </Typography>
      </Box>
      <Divider />
      <Box display="flex" alignItems="center" mb={2} mt={2} gap={1}>
        <Avatar alt={user?.username}>
          {user?.username.charAt(0).toUpperCase()}
        </Avatar>
        <span>{user ? user.fullName : ""}</span>
      </Box>
      <Box
        component="form"
        sx={{
          mt: 3,
          maxHeight: "400px",
          overflowY: "auto",
          scrollbarWidth: "none", 
          "&::-webkit-scrollbar": {
            display: "none", 
          },
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={2}
          variant="standard"
          label="¿ Qué estás pensando hoy ?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {imagePreview && (
          <Box mt={2} position="relative">
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
            <Button
              onClick={handleRemoveImage}
              color="error"
              size="small"
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              Eliminar
            </Button>
          </Box>
        )}

        <Box mt={2} gap={2}>
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Subir imagen
            <VisuallyHiddenInput
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        {error && (
          <Box color="error.main" sx={{ mt: 2 }}>
            {error}
          </Box>
        )}
      </Box>
      <Box display="flex" mt={2}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              background: "primary.main",
              gap: 1,
            }}
            onClick={handleSubmit}
            disabled={!content}
          >
            Publicar <PublicIcon />
          </Button>
        </Box>
    </Container>
  );
};

export default CreatePublicationForm;
