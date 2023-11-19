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
  default: {
    admin: {
      emails: ["ac5295@student.jamk.fi", "alexandr.makarov.2000@gmail.com"],
    },
  },
};

export default config;
