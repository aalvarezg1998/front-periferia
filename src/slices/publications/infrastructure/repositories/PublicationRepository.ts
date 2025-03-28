import { IPublicationRepository } from '../../domain/interfaces/IPublicationRepository';
import { Publication, CreatePublicationDTO, PublicationPaginated } from '../../domain/models/Publication';
import { 
  createPublicationApi, 
  getPublicationsApi, 
  likePublicationApi 
} from '../api/publicationApi';

export class PublicationRepository implements IPublicationRepository {
  async createPublication(publication: CreatePublicationDTO): Promise<Publication> {
    return createPublicationApi(publication);
  }

  async getPublications(page: number, limit: number): Promise<PublicationPaginated> {
    return getPublicationsApi(page, limit);
  }

  async likePublication(publicationId: number, userId: number): Promise<boolean> {
    return likePublicationApi(publicationId, userId);
  }
}