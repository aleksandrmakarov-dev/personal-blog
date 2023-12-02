export const Routing = {
  root: "/",
  posts: {
    root: "/posts",
    index: "/posts",
    slug: (slug: string) => `/posts/${slug}`,
    edit: (slug: string) => `/posts/${slug}/edit`,
    new: "/posts/new",
  },
  tags: {
    root: "/tags",
    slug: (slug: string) => `/tags/${slug}`,
  },
  aboutMe: "/about-me",
  users: {
    root: "/users",
    profile: (slug: string) => `/users/${slug}`,
    settings: (slug: string) => `/users/${slug}/settings`,
  },
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    signOut: "/sign-out",
    forgotPassword: "/forgot-password",
  },
  errors: {
    notFound: "/not-found",
    unauthorized: "/unauthorized",
  },
};
