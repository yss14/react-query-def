import { QueryClient } from "./query-client";
import { useQueryClient as useQueryClientOriginal } from "react-query";

export const useQueryClient = (): QueryClient =>
  useQueryClientOriginal() as QueryClient;
