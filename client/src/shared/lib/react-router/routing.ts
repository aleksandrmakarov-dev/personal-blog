export const Routing = {
  root: "/",
  posts: {
    root: "/posts",
    index: "/posts",
    details: (slug: string) => `/posts/${slug}`,
    edit: (id: string) => `/posts/${id}/edit`,
    new: "/posts/new",
  },
  aboutMe: "/about-me",
  users: {
    root: "/users",
    details: (id: string) => `/users/${id}`,
  },
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    signOut: "/sign-out",
    forgotPassword: "/forgot-password",
  },
};
