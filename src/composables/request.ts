import { createFetch, UseFetchReturn, MaybeRef, isObject } from '@vueuse/core'
import { requestTimeout } from '~/utils'
import { stringifyQuery, LocationQueryRaw } from 'vue-router'

const baseUrl = import.meta.env.MODE === 'production' ? 'http://8.136.112.243:8000' : '/devServer'

const useRequest = createFetch({
  baseUrl,
  options: {
    immediate: false,
    timeout: requestTimeout,
    onFetchError({ data, error }) {
      window.$message.error(error)

      return { data, error }
    },
  },
  fetchOptions: {
    mode: 'cors',
    credentials: 'omit',
  },
})

/**
 * 封装 get 请求
 * @param url 请求地址
 * @param query 请求参数
 */

export function useGet<T = unknown>(
  url: MaybeRef<string>,
  query?: MaybeRef<unknown>
): UseFetchReturn<T> {
  const _url = computed(() => {
    const _url = unref(url)
    const _query = unref(query)

    const queryString = isObject(_query) ? stringifyQuery(_query as LocationQueryRaw) : _query || ''

    return `${_url}${queryString ? '?' : ''}${queryString}`
  })

  return useRequest<T>(_url).json()
}

/**
 * 封装 post 请求
 * @param url 请求地址
 * @param payload 请求参数
 */

export function usePost<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).post(payload).json()
}

/**
 * 封装 put 请求
 * @param url 请求地址
 * @param payload 请求参数
 */

export function usePut<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).put(payload).json()
}

/**
 * 封装 delete 请求
 * @param url 请求地址
 * @param payload 请求参数
 */

export function useDelete<T = unknown>(
  url: MaybeRef<string>,
  payload?: MaybeRef<unknown>
): UseFetchReturn<T> {
  return useRequest<T>(url).delete(payload).json()
}

/**
 * 封装获取Blob进行下载
 * @param url 请求地址
 */

export function useBlob(url: MaybeRef<string>): UseFetchReturn<Blob> {
  return useRequest(url).blob()
}
