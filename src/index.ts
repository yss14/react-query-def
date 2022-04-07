import {
  QueryClient,
  QueryFunction,
  QueryKey,
  SetDataOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { Updater } from "react-query/types/core/utils";

type QueryDef<TData, TQueryKey extends QueryKey> = {
  queryKey: TQueryKey;
  __type: TData;
};

const QueryDef =
  <TData>() =>
  <TQueryKey extends QueryKey>(
    queryKey: TQueryKey
  ): QueryDef<TData, TQueryKey> => ({
    queryKey,
    __type: null as unknown as TData,
  });

type QueryKeyFn<TQueryKey extends QueryKey, TArgs extends unknown[]> = (
  ...args: TArgs
) => TQueryKey;

type QueryDefLazy<TData, TQueryKey extends QueryKey> = {
  queryKey: QueryKeyFn<TQueryKey, unknown[]>;
  __type: TData;
};

const QueryDefLazy =
  <TData>() =>
  <TQueryKey extends QueryKey, TArgs extends unknown[]>(
    queryKey: QueryKeyFn<TQueryKey, TArgs>
  ) =>
  (...args: TArgs): QueryDef<TData, TQueryKey> => ({
    queryKey: queryKey(...args),
    __type: null as unknown as TData,
  });

const isQueryDef = <TData, TQueryKey extends QueryKey>(
  obj: unknown
): obj is QueryDef<TData, TQueryKey> =>
  (obj as QueryDef<any, any>).__type === null &&
  !!(obj as QueryDef<any, any>).queryKey;

interface User {
  id: number;
  name: string;
}

interface Note {
  id: number;
  text: string;
}

const UserQuery = QueryDefLazy<User>()(
  (userId: number) => ["users", userId] as const
);
const NoteQuery = QueryDef<Note>()(["notes"]);

const useQueryDef = <
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
) => useQuery(queryDef.queryKey, queryFn, options);

const getUserAsync = () => Promise.resolve<User>({ id: 42, name: "Leed" });

const useUser = () => {
  return useQueryDef(UserQuery(42), () => getUserAsync(), {
    select: (user) => user.id,
  });
};

type QueryUpdater<TData> = TData | ((oldData: TData | undefined) => TData);

export class QueryClientWithDef extends QueryClient {
  setQueryData<TData>(
    queryKey: QueryKey,
    updater: Updater<TData | undefined, TData> | undefined,
    options?: SetDataOptions
  ): TData | undefined;
  setQueryData<TData>(
    queryDef: QueryDef<TData, QueryKey>,
    updater: QueryUpdater<TData>
  ): TData | undefined;
  setQueryData<TData>(
    queryDefOrKey: QueryDef<TData, QueryKey> | QueryKey,
    updater: QueryUpdater<TData>
  ): TData | undefined {
    return super.setQueryData(
      isQueryDef(queryDefOrKey) ? queryDefOrKey.queryKey : queryDefOrKey,
      updater
    );
  }
}

const queryClient = new QueryClientWithDef();

queryClient.setQueryData(UserQuery(42), { id: 1337, name: "Yolo" });
