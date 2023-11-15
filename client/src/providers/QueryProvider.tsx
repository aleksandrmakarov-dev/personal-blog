import { queryClient } from "@/shared/lib";
import { QueryClientProvider as TanStackQueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default function QueryProvider({ children }: PropsWithChildren<{}>) {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
}
