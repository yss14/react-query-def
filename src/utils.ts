import { QueryKey } from "react-query";
import { QueryDef } from "./query-def";

export const isQueryDef = <TData, TQueryKey extends QueryKey>(
  obj: unknown
): obj is QueryDef<TData, TQueryKey> =>
  (obj as QueryDef<any, any>).__type === null &&
  !!(obj as QueryDef<any, any>).queryKey;

export const isQueryKey = (obj: unknown): obj is QueryKey => Array.isArray(obj);
