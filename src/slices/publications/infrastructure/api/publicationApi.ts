import { Publication, CreatePublicationDTO, PublicationPaginated } from '../../domain/models/Publication';
import { publicationsApiClient } from '../../../shared/utils/apiClient';

// Crear una publicación
export const createPublicationApi = async (publicationData: CreatePublicationDTO): Promise<Publication> => {
  try {
    return await publicationsApiClient.post<Publication>('/post-created', publicationData);
  } catch (error) {
    throw new Error('Error al crear publicación');
  }
};

// Obtener publicaciones con paginación
export const getPublicationsApi = async (page = 0, size = 10): Promise<PublicationPaginated> => {
  try {
    return await publicationsApiClient.get<PublicationPaginated>('/all', {
      params: { page, size },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al obtener publicaciones");
  }
};

// Dar like a una publicación
export const likePublicationApi = async (publicationId: number, userId: number): Promise<boolean> => {
  try {
    return await publicationsApiClient.post<boolean>(`/add-like`, { postId: publicationId, userId });
  } catch (error) {
    throw new Error('Error al dar like a la publicación');
  }
};
