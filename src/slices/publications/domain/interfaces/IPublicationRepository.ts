import { Publication, CreatePublicationDTO, PublicationPaginated } from '../models/Publication';

export interface IPublicationRepository {
  createPublication(publication: CreatePublicationDTO): Promise<Publication>;
  getPublications(page: number, limit: number): Promise<PublicationPaginated>;
  likePublication(publicationId: number, userId: number): Promise<boolean>;
}