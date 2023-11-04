import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import { Routing } from "../shared/lib";
import { MainLayout } from "../pages/layouts";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const PostsPage = lazy(() => import("../pages/posts/PostsPage"));
const AboutMePage = lazy(() => import("../pages/about-me/AboutMePage"));
const PostPage = lazy(() => import("../pages/post/PostPage"));
const PostEditorPage = lazy(
  () => import("../pages/post-editor/PostEditorPage")
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={Routing.root} element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path={Routing.posts.index}>
        <Route index element={<PostsPage />} />
        <Route path="new" element={<PostEditorPage />} />
        <Route path=":slug" element={<PostPage />} />
      </Route>
      <Route path={Routing.aboutMe} element={<AboutMePage />} />
    </Route>
  )
);

export function Router() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
