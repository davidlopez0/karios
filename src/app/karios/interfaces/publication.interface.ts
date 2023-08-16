import {User} from "./user.interface";

export interface Publication {
  publicationId?: number;
  description: string;
  imageUrl: string;
  publicationDate?: Date;
  userId: number;
  user?: User;
}
