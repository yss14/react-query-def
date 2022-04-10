import { QueryClient } from "./query-client";
import { QueryDef, QueryDefLazy } from "./query-def";
import { useQuery } from "./use-query";
import { UseQueryOptions } from "./use-query-options";

interface User {
  id: number;
  name: string;
}

interface UserWithNotes extends User {
  notes: Note[];
}

interface Note {
  id: number;
  text: string;
}

const userKeys = {
  all: ["users"] as const,
  single: (userId: number) => [...userKeys.all, userId] as const,
};

const noteKeys = {
  all: ["notes"] as const,
};

// for lazy query defs even the query keys is infered precisly due to currying
const UserQuery = QueryDefLazy<User>()(userKeys.single);

/* by default without using currying for QueryDef TQueryKey is only narrowed down to the generic default value QueryKey.
   However, if we want the exact key type for now we need to pass it to QueryDef manually. This is only required you really need the information about the concret key type */
const UsersQuery = QueryDef<User[], typeof userKeys.all>(userKeys.all);

const NoteQuery = QueryDef<Note>(noteKeys.all);

const getUserAsync = (userId: number) =>
  Promise.resolve<User>({ id: userId, name: "Leed" });

const useUser = (
  userId: number,
  opts?: UseQueryOptions<typeof UserQuery, unknown, number>
) => {
  return useQuery(UserQuery(userId), () => getUserAsync(userId), {
    select: (user) => user.id,
    ...opts,
  });
};

const queryClient = new QueryClient();

queryClient.setQueryData(UserQuery(42), { id: 1337, name: "Yolo" });

// the following would cause an error
// Object literal may only specify known properties, and 'note' does not exist in type 'Updater<User | undefined, User>'
// queryClient.setQueryData(UserQuery(42), { id: 1337, note: "Yolo" });

// type inference for UseQueryOptions from query definition
type UseNoteQueryOpts = UseQueryOptions<typeof NoteQuery>;
type UseUserQueryOpts = UseQueryOptions<typeof UserQuery>;
