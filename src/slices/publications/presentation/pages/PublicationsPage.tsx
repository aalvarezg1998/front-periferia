import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Modal,
  Paper,
} from "@mui/material";
import { PublicationRepository } from "../../infrastructure/repositories/PublicationRepository";
import { GetPublicationsUseCase } from "../../application/useCases/getPublicationsUseCase";
import { Publication } from "../../domain/models/Publication";
import CreatePublicationForm from "../components/CreatePublicationForm";
import PublicationCard from "../components/PublicationCard";
import { useAuth } from "../../../shared/context/AppContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RefreshIcon from '@mui/icons-material/Refresh';

const PublicationsPage: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [size, setSize] = useState(10);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setLoading(true);
        const publicationRepository = new PublicationRepository();
        const getPublicationsUseCase = new GetPublicationsUseCase(
          publicationRepository
        );

        const fetchedPublications = await getPublicationsUseCase.execute(page, size);
        setPublications((prevPublications) =>
          page === 0
            ? fetchedPublications.data
            : [...prevPublications, ...fetchedPublications.data]
        );
        setLoading(false);
      } catch (err) {
        setError("No se pudieron cargar las publicaciones");
        setLoading(false);
      }
    };

    fetchPublications();
  }, [size, refresh, page]);

  const handleLoadMore = () => {
    setSize((prevSize) => prevSize + 10);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const onPublicationCreated = () => {
    setRefresh((prev) => !prev);
    setPage(0);
    setOpenModal(false);
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Alert severity="warning">
          Debes iniciar sesión para ver las publicaciones
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      {/* Botón para abrir el modal del formulario */}
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Box > 
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpenModal(true)}
            style={{ borderRadius: 20, gap: 9 }}
            >
            Crear nueva publicación
            <AddCircleIcon style={{ width: "30px", height: "30px" }} />
          </Button>
        </Box>
        <Button
          title="Cargar publicaciones recientes"
          variant="contained"
          color="primary"
          onClick={onPublicationCreated}
          style={{ borderRadius: 20 }}
        >
          <RefreshIcon style={{ width: "30px", height: "30px" }} />
        </Button>
      </Box>

      {/* Modal para crear publicación */}
      <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          onClick={handleCloseModal}
        >
          <Paper
            sx={{ padding: 2, width: 600, borderRadius: 3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CreatePublicationForm
              onPublicationCreated={onPublicationCreated}
            />
          </Paper>
        </Box>
      </Modal>

      {/* Lista de publicaciones */}
      <Box sx={{ mt: 4 }}>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {publications.map((publication) => (
          <PublicationCard
            key={publication.postId}
            publication={publication}
            onPublicationCreated={onPublicationCreated}
          />
        ))}

        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <CircularProgress />
          </Box>
        )}

        {!loading && publications.length === 0 && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            No hay publicaciones aún
          </Typography>
        )}

        {/* Botón de cargar más */}
        {!loading && publications.length > 0 && (
          <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleLoadMore}
              style={{ borderRadius: 20 }}
              disabled={publications.length < size }
            >
              Cargar más publicaciones
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PublicationsPage;
