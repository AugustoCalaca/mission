export interface ICourse {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
  startedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
