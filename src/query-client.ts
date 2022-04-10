import {
  QueryClient as QueryClientOriginal,
  QueryClientConfig,
  QueryKey,
  SetDataOptions,
} from 'react-query'
import { QueryState } from 'react-query/types/core/query'
import { QueryFilters, Updater } from 'react-query/types/core/utils'
import { QueryDef } from './query-def'
import { isQueryDef, isQueryKey } from './utils'

export class QueryClient extends QueryClientOriginal {
  constructor(config?: QueryClientConfig) {
    super(config)
  }

  getQueryData<TData = unknown>(
    queryKey: QueryKey,
    filters?: QueryFilters
  ): TData | undefined
  getQueryData<TData>(
    queryDef: QueryDef<TData, QueryKey>,
    filters?: QueryFilters
  ): TData | undefined
  getQueryData<TData>(
    queryDefOrKey: QueryDef<TData, QueryKey> | QueryKey,
    filters?: QueryFilters
  ) {
    return super.getQueryData(
      isQueryDef(queryDefOrKey) ? queryDefOrKey.queryKey : queryDefOrKey,
      filters
    )
  }

  getQueriesData<TData = unknown>(queryKey: QueryKey): [QueryKey, TData][]
  getQueriesData<TData = unknown>(filters: QueryFilters): [QueryKey, TData][]
  getQueriesData<TData>(
    queryDef: QueryDef<TData, QueryKey>
  ): [QueryKey, TData][]
  getQueriesData<TData>(
    queryDefOrFiltersOrKey: QueryDef<TData, QueryKey> | QueryFilters | QueryKey
  ) {
    if (isQueryDef(queryDefOrFiltersOrKey)) {
      return super.getQueriesData(queryDefOrFiltersOrKey.queryKey)
    } else if (isQueryKey(queryDefOrFiltersOrKey)) {
      return super.getQueriesData(queryDefOrFiltersOrKey)
    } else {
      return super.getQueriesData(queryDefOrFiltersOrKey)
    }
  }

  setQueryData<TData>(
    queryKey: QueryKey,
    updater: Updater<TData | undefined, TData> | undefined,
    options?: SetDataOptions
  ): TData | undefined
  setQueryData<TData>(
    queryDef: QueryDef<TData, QueryKey>,
    updater: Updater<TData | undefined, TData> | undefined
  ): TData | undefined
  setQueryData<TData>(
    queryDefOrKey: QueryDef<TData, QueryKey> | QueryKey,
    updater: Updater<TData | undefined, TData> | undefined
  ): TData | undefined {
    return super.setQueryData(
      isQueryDef(queryDefOrKey) ? queryDefOrKey.queryKey : queryDefOrKey,
      updater
    )
  }

  setQueriesData<TData>(
    queryKey: QueryKey,
    updater: Updater<TData | undefined, TData>,
    options?: SetDataOptions
  ): [QueryKey, TData][]
  setQueriesData<TData>(
    filters: QueryFilters,
    updater: Updater<TData | undefined, TData>,
    options?: SetDataOptions
  ): [QueryKey, TData][]
  setQueriesData<TData>(
    queryDef: QueryDef<TData, QueryKey>,
    updater: Updater<TData | undefined, TData>,
    options?: SetDataOptions
  ): [QueryKey, TData][]
  setQueriesData<TData>(
    queryDefOrKeyOfFilters: QueryKey | QueryFilters | QueryDef<TData, QueryKey>,
    updater: Updater<TData | undefined, TData>,
    options?: SetDataOptions
  ) {
    if (isQueryDef(queryDefOrKeyOfFilters)) {
      return super.setQueriesData(
        queryDefOrKeyOfFilters.queryKey,
        updater,
        options
      )
    } else if (isQueryKey(queryDefOrKeyOfFilters)) {
      return super.setQueriesData(queryDefOrKeyOfFilters, updater, options)
    } else {
      return super.setQueriesData(queryDefOrKeyOfFilters, updater, options)
    }
  }

  getQueryState<TData = unknown, TError = undefined>(
    queryKey: QueryKey,
    filters?: QueryFilters
  ): QueryState<TData, TError> | undefined
  getQueryState<TData, TError = undefined>(
    queryDef: QueryDef<TData, QueryKey>,
    filters?: QueryFilters
  ): QueryState<TData, TError> | undefined
  getQueryState<TData, TError>(
    queryDefOrKey: QueryDef<TData, QueryKey> | QueryKey,
    filters?: QueryFilters
  ): QueryState<TData, TError> | undefined {
    if (isQueryDef(queryDefOrKey)) {
      return super.getQueryState(queryDefOrKey.queryKey, filters)
    } else {
      return super.getQueryState(queryDefOrKey, filters)
    }
  }

  // todo override remaining methods
}
