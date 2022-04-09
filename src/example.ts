import { QueryClient } from "./query-client";
import { QueryDef, QueryDefLazy } from "./query-def";
import { useQuery } from "./use-query";
import { UseQueryOptions } from "./use-query-options";

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
const noteKey = ["notes"] as const;
const NoteQuery = QueryDef<Note, typeof noteKey>(noteKey);

const getUserAsync = () => Promise.resolve<User>({ id: 42, name: "Leed" });

const useUser = () => {
  return useQuery(UserQuery(42), () => getUserAsync(), {
    select: (user) => user.id,
  });
};

type QueryUpdater<TData> = TData | ((oldData: TData | undefined) => TData);

const queryClient = new QueryClient();

queryClient.setQueryData(UserQuery(42), { id: 1337, name: "Yolo" });

type NoteQueryOpts = UseQueryOptions<typeof NoteQuery>;
type UserQueryOpts = UseQueryOptions<typeof UserQuery>;
