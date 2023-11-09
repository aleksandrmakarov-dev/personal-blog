export interface PostDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  image?: string;
  created: Date;
  updated?: Date;
  likes: number;
  user: { id: string; name: string };
  tags: TagDTO[];
  comments: number;
}

export interface PostCardDTO extends Omit<PostDTO, "body"> {}

export interface TagDTO {
  id: string;
  name: string;
}
