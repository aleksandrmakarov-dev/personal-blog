export interface PostCardDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  created: Date;
  updated?: Date;
  likes: number;
  user: { name: string };
  tags: TagDTO[];
  comments: number;
}

export interface TagDTO {
  id: string;
  name: string;
}
