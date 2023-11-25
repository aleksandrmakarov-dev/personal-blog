import ErrorBase from "@/shared/ui/error-base/ErrorBase";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorBase
        header="Oops!"
        title="Sorry, an unexpected error happend!"
        subtitle={error.data}
      />
    );
  }
  return null;
}
