import { IPublicationRepository } from '../../domain/interfaces/IPublicationRepository';
import { CreatePublicationDTO, Publication } from '../../domain/models/Publication';

export class CreatePublicationUseCase {
  constructor(private readonly publicationRepository: IPublicationRepository) {}

  async execute(publicationData: CreatePublicationDTO): Promise<Publication> {
    if (!publicationData.content || publicationData.content.trim() === '') {
      throw new Error('El contenido de la publicación no puede estar vacío');
    }

    return this.publicationRepository.createPublication(publicationData);
  }
}