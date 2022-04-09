import { QueryDef } from "./query-def";
import {
  QueryKey,
  UseQueryOptions as UseQueryOptionsOriginal,
} from "react-query";

export type UseQueryOptions<
  TQueryDef extends
    | QueryDef<unknown, QueryKey>
    | ((...args: any) => QueryDef<unknown, QueryKey>),
  TError = unknown
> = TQueryDef extends (...args: any) => QueryDef<infer TData, infer TQueryKey>
  ? UseQueryOptionsOriginal<TData, TError, TData, TQueryKey>
  : TQueryDef extends QueryDef<infer TData, infer TQueryKey>
  ? UseQueryOptionsOriginal<TData, TError, TData, TQueryKey>
  : never;
