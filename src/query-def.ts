import { QueryKey } from "react-query";

export type QueryDef<TData, TQueryKey extends QueryKey> = {
  queryKey: TQueryKey;
  __type: TData;
};

export const QueryDef =
  <TData>() =>
  <TQueryKey extends QueryKey>(
    queryKey: TQueryKey
  ): QueryDef<TData, TQueryKey> => ({
    queryKey,
    __type: null as unknown as TData,
  });

export type QueryKeyFn<TQueryKey extends QueryKey, TArgs extends unknown[]> = (
  ...args: TArgs
) => TQueryKey;

export type QueryDefLazy<TData, TQueryKey extends QueryKey> = {
  queryKey: QueryKeyFn<TQueryKey, unknown[]>;
  __type: TData;
};

export const QueryDefLazy =
  <TData>() =>
  <TQueryKey extends QueryKey, TArgs extends unknown[]>(
    queryKey: QueryKeyFn<TQueryKey, TArgs>
  ) =>
  (...args: TArgs): QueryDef<TData, TQueryKey> => ({
    queryKey: queryKey(...args),
    __type: null as unknown as TData,
  });
