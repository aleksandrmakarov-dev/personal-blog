export const Routing = {
  root: "/",
  posts: {
    index: "/posts",
    details: (slug: string) => `/posts/${slug}`,
    edit: (id: string) => `/posts/${id}/edit`,
  },
  aboutMe: "/about-me",
  auth:{
    signIn:"/sign-in",
    signUp:"/sign-up",
    signOut:"/sign-out",
    forgotPassword:"/forgot-password"
  }
};
