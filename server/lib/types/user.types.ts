export interface UserProfileDTO {
  id: string;
  slug: string;
  name: string;
  image?: string;
}

export interface JWTPayload {
  id: string;
  role: string;
}
