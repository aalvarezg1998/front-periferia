
export interface Publication {
  postId: number;
  content: string;
  imageUrl?: string;
  userId: number;
  username: string;
  createdAt: Date;
  likes: LikeDTO[];
}

export interface CreatePublicationDTO {
  content: string;
  userId: number;
  username: string;
  imageUrl?: string;
}

export interface PublicationPaginated {
  data: Publication[];
  totalPages: number;
}

export interface LikeDTO {
  id: number;
  userId: number;
  postId: number;
}