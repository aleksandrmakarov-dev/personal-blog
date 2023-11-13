export interface UserProfileDTO {
  id: string;
  username: string;
  bio: string;
  image?: string;
  following: boolean;
}
