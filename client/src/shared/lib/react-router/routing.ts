export const Routing = {
  root: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  posts: {
    index: "/posts",
    details: (slug: string) => `/posts/${slug}`,
    edit: (id: string) => `/posts/${id}/edit`,
  },
  aboutMe: "/about-me",
};
