import {
  QueryFunction,
  QueryKey,
  useQuery as useQueryOriginal,
  UseQueryOptions,
} from "react-query";
import { QueryDef } from "./query-def";

export const useQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryDef: QueryDef<TQueryFnData, TQueryKey>,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
) => useQueryOriginal(queryDef.queryKey, queryFn, options);
