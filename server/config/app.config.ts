import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.COOKIE_NAME_REFRESH_TOKEN) {
  throw new Error("Missing COOKIE_NAME_REFRESH_TOKEN");
}

if (!process.env.COOKIE_NAME_ACCESS_TOKEN) {
  throw new Error("Missing COOKIE_NAME_ACCESS_TOKEN");
}

if (!process.env.CLOUDINARY_ROOT) {
  throw new Error("Missing CLOUDINARY_ROOT");
}

if (!process.env.CLOUDINARY_API_KEY) {
  throw new Error("Missing CLOUDINARY_API_KEY");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  throw new Error("Missing CLOUDINARY_API_SECRET");
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  throw new Error("Missing CLOUDINARY_CLOUD_NAME");
}

if (!process.env.LOCAL_ROOT) {
  throw new Error("Missing LOCAL_ROOT");
}

if (!process.env.DEFAULT_ADMIN_EMAIL) {
  throw new Error("Missing DEFAULT_ADMIN_EMAIL");
}

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI");
}

if (!process.env.TOKEN_SECRET) {
  throw new Error("Missing TOKEN_SECRET");
}

const config = {
  refreshToken: {
    cookie: {
      name: process.env.COOKIE_NAME_REFRESH_TOKEN,
    },
    expires: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  },
  accessToken: {
    cookie: {
      name: process.env.COOKIE_NAME_ACCESS_TOKEN,
    },
    expires: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    expirationTime: 15 * 60 * 1000, // 15 minutes
    secretKey: process.env.TOKEN_SECRET,
  },
  upload: {
    path: {
      cloud: process.env.CLOUDINARY_ROOT,
      local: (value: string) => `${process.env.LOCAL_ROOT}/${value}`,
    },
  },
  default: {
    admin: {
      emails: [process.env.DEFAULT_ADMIN_EMAIL],
    },
  },
  database: {
    uri: process.env.MONGODB_URI,
  },
};

export function cloudinaryConfigure() {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export default config;
