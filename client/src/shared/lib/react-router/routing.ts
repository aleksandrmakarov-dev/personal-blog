export const Routing = {
  root: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  posts: {
    index: "/posts",
    details: (id: string) => `/posts/${id}`,
    edit: (id: string) => `/posts/${id}/edit`,
  },
  aboutMe: "/about-me",
};
