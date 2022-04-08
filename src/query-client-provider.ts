import {
  QueryClientProvider as QueryClientProviderOriginal,
  QueryClientProviderProps as QueryClientProviderPropsOriginal,
} from "react-query";
import { QueryClient } from "./query-client";

export type QueryClientProviderProps = Omit<
  QueryClientProviderPropsOriginal,
  "client"
> & {
  client: QueryClient;
};

export const QueryClientProvider = QueryClientProviderOriginal as ({
  client,
  children,
  context,
  contextSharing,
}: QueryClientProviderProps) => ReturnType<typeof QueryClientProviderOriginal>;
