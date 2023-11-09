import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { Routing } from "../shared/lib";
import { MainLayout, AuthLayout } from "../pages/layouts";
import FullPageWrapper from "../shared/ui/fullpage-wrapper/FullPageWrapper";
import { CircularProgress } from "@mui/material";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const PostsPage = lazy(() => import("../pages/posts/PostsPage"));
const AboutMePage = lazy(() => import("../pages/about-me/AboutMePage"));
const PostPage = lazy(() => import("../pages/post/PostPage"));
const PostEditorPage = lazy(
  () => import("../pages/post-editor/PostEditorPage")
);
const SignInPage = lazy(() => import("../pages/auth/sign-in/SignInPage"));
const SignUpPage = lazy(() => import("../pages/auth/sign-up/SignUpPage"));
const UserPage = lazy(() => import("../pages/user/UserPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={Routing.root} element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path={Routing.posts.root}>
          <Route index element={<PostsPage />} />
          <Route path="new" element={<PostEditorPage />} />
          <Route path=":slug" element={<PostPage />} />
        </Route>
        <Route path={Routing.aboutMe} element={<AboutMePage />} />
        <Route path={Routing.users.root}>
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
      <Route path={Routing.root} element={<AuthLayout />}>
        <Route path={Routing.auth.signIn} element={<SignInPage />} />
        <Route path={Routing.auth.signUp} element={<SignUpPage />} />
      </Route>
    </>
  )
);

export function Router() {
  return (
    <Suspense
      fallback={
        <FullPageWrapper>
          <div className="flex flex-col items-center justify-center text-center">
            <CircularProgress className="mb-2" />
            <p className="text-xl">Loading...</p>
          </div>
        </FullPageWrapper>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
