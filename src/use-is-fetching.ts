import {
  ContextOptions,
  QueryKey,
  useIsFetching as useIsFetchingOriginal,
} from "react-query";
import { QueryFilters } from "react-query/types/core/utils";
import { QueryDef } from "./query-def";
import { isQueryDef, isQueryKey } from "./utils";

const isContextOptions = (obj: unknown): obj is ContextOptions =>
  typeof obj === "object" && !!(obj as ContextOptions).context;

export function useIsFetching(
  filters?: QueryFilters,
  options?: ContextOptions
): number;
export function useIsFetching(
  queryKey?: QueryKey,
  filters?: QueryFilters,
  options?: ContextOptions
): number;
export function useIsFetching(
  queryDef: QueryDef<any, any>,
  filters?: QueryFilters,
  options?: ContextOptions
): number;
export function useIsFetching(
  queryDefOrKeyOrFilters?: QueryDef<any, any> | QueryKey | QueryFilters,
  filtersOrOptions?: QueryFilters | ContextOptions,
  options?: ContextOptions
) {
  if (isQueryDef(queryDefOrKeyOrFilters)) {
    if (!filtersOrOptions || !isContextOptions(filtersOrOptions)) {
      return useIsFetchingOriginal(
        queryDefOrKeyOrFilters.queryKey,
        filtersOrOptions,
        options
      );
    } else {
      throw new Error("This code branch should never been reached");
    }
  } else if (isQueryKey(queryDefOrKeyOrFilters)) {
    if (!filtersOrOptions || !isContextOptions(filtersOrOptions)) {
      return useIsFetchingOriginal(
        queryDefOrKeyOrFilters,
        filtersOrOptions,
        options
      );
    } else {
      throw new Error("This code branch should never been reached");
    }
  } else {
    if (!filtersOrOptions || isContextOptions(filtersOrOptions)) {
      return useIsFetchingOriginal(queryDefOrKeyOrFilters, filtersOrOptions);
    } else {
      throw new Error("This code branch should never been reached");
    }
  }
}
