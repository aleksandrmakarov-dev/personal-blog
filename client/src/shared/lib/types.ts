export interface PostCardDTO {
  title: string;
  description: string;
  image?: string;
  created: Date;
  updated?: Date;
  likes: number;
  user: { name: string };
  tags: { name: string }[];
  comments: number;
}
