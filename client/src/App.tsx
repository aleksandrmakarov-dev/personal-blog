import QueryProvider from "./providers/QueryProvider";
import { Router } from "./providers/RouterProvider";

export default function App() {
  return (
    <QueryProvider>
      <Router />
    </QueryProvider>
  );
}
