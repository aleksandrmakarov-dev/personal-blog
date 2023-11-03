import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { queryClient } from "../shared/lib";

export default function QueryProvider({ children }: PropsWithChildren<{}>) {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
}
