import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Publication } from "../../domain/models/Publication";
import { PublicationRepository } from "../../infrastructure/repositories/PublicationRepository";
import { useAuth } from "../../../shared/context/AppContext";
import { formatTimeAgo } from "../../../shared/utils/DateUtils";

interface PublicationCardProps {
  publication: Publication;
  onPublicationCreated: () => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  onPublicationCreated,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const liked = publication.likes.some((like) => like.userId === user.id);
    setIsLiked(liked);
  }, []);

  const handleLike = async () => {
    if (!user) return;

    try {
      const publicationRepository = new PublicationRepository();
      const liked = await publicationRepository.likePublication(
        publication.postId,
        user.id
      );

      setIsLiked(liked);
      onPublicationCreated();
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: "100%", mb: 2, borderRadius: 3 }}>
      <CardHeader
        avatar={
          <Avatar alt={publication.username}>
            {publication.username.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={publication.username}
        subheader={formatTimeAgo(`${publication.createdAt}`)}
      />

      {publication.imageUrl && (
        <CardMedia
          component="img"
          height="294"
          image={publication.imageUrl}
          alt="Imagen de publicación"
          sx={{
            width: "100%", 
            height: "294px", 
            objectFit: "contain", 
            objectPosition: "center", 
            display: "block", 
            margin: "0 auto", 
            backgroundColor: "#f0f0f0", 
          }}
        />
      )}

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {publication.content}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleLike}
          color={isLiked ? "error" : "default"}
          title="Me gusta"
        >
          <FavoriteIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {publication.likes.length ?? 0}
          </Typography>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PublicationCard;
