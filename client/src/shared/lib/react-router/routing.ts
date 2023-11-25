export const Routing = {
  root: "/",
  posts: {
    root: "/posts",
    index: "/posts",
    details: (slug: string) => `/posts/${slug}`,
    edit: (slug: string) => `/posts/${slug}/edit`,
    new: "/posts/new",
  },
  aboutMe: "/about-me",
  users: {
    root: "/users",
    details: (slug: string) => `/users/${slug}`,
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
