import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import { MainLayout, AuthLayout } from "@/pages/layouts";
import { Routing } from "@/shared/lib";
import FullPageWrapper from "@/shared/ui/fullpage-wrapper/FullPageWrapper";
import PublicRoute from "@/shared/ui/public-route/PublicRoute";
import PrivateRoute from "@/shared/ui/private-route/PrivateRoute";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const PostsPage = lazy(() => import("@/pages/posts/PostsPage"));
const AboutMePage = lazy(() => import("@/pages/about-me/AboutMePage"));
const PostPage = lazy(() => import("@/pages/post/PostPage"));
const PostEditorPage = lazy(() => import("@/pages/post-editor/PostEditorPage"));
const SignInPage = lazy(() => import("@/pages/sign-in/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/sign-up/SignUpPage"));
const UserPage = lazy(() => import("@/pages/user/UserPage"));
const Unauthorized = lazy(() => import("@/pages/unauthorized/Unauthorized"));
const ErrorPage = lazy(() => import("@/pages/error-page/ErrorPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={Routing.root}
        element={<MainLayout />}
        errorElement={<ErrorPage />}
      >
        <Route index element={<HomePage />} />
        <Route path={Routing.posts.root}>
          <Route index element={<PostsPage />} />
          <Route element={<PrivateRoute roles={["admin"]} />}>
            <Route path="new" element={<PostEditorPage />} />
          </Route>
          <Route path=":slug">
            <Route index element={<PostPage />} />
            <Route element={<PrivateRoute roles={["admin"]} />}>
              <Route path="edit" element={<PostEditorPage edit />} />
            </Route>
          </Route>
        </Route>
        <Route path={Routing.aboutMe} element={<AboutMePage />} />
        <Route path={Routing.users.root}>
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
      <Route path={Routing.root} element={<AuthLayout />}>
        <Route element={<PublicRoute />}>
          <Route path={Routing.auth.signIn} element={<SignInPage />} />
          <Route path={Routing.auth.signUp} element={<SignUpPage />} />
        </Route>
      </Route>
      <Route path={Routing.errors.unauthorized} element={<Unauthorized />} />
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
            <p className="text-lg font-semibold">Please wait for a while</p>
            <p className="text-gray-700">Loading page...</p>
          </div>
        </FullPageWrapper>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
