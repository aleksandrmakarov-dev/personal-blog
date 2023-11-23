import cloudinary from "cloudinary";

const config = {
  refreshToken: {
    cookie: {
      name: "refresh-token",
    },
    expires: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  },
  accessToken: {
    cookie: {
      name: "access-token",
    },
    expires: () => new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
  },
  upload: {
    maxFileSize: 1024 * 1024 * 5, // 5MB
    allowedMimeTypes: ["image/jpeg", "image/png", "image/gif"],
    path: {
      cloud: "personal-website-development/uploads",
      local: (value: string) => `uploads/${value}`,
    },
  },
  default: {
    admin: {
      emails: ["ac5295@student.jamk.fi", "alexandr.makarov.2000@gmail.com"],
    },
  },
};

export function cloudinaryConfigure() {
  cloudinary.v2.config({
    cloud_name: "dbr3vpkso",
    api_key: "456956429427678",
    api_secret: "KHKKBvmiVaT44XMgmcil_iCLWe0",
    secure: true,
  });
}

export default config;
