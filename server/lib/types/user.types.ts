export interface UserProfileDTO {
  id: string;
  username: string;
  bio: string;
  image?: string;
  following: boolean;
}

export interface JWTPayload {
  id: string;
  role: string;
}
