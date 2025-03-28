import { IPublicationRepository } from '../../domain/interfaces/IPublicationRepository';
import { PublicationPaginated } from '../../domain/models/Publication';

export class GetPublicationsUseCase {
  constructor(private readonly publicationRepository: IPublicationRepository) {}

  async execute(page = 1, limit = 10): Promise<PublicationPaginated> {
    return this.publicationRepository.getPublications(page, limit);
  }
}