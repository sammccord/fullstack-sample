import isString from 'lodash/isString'

export const requestInit: RequestInit = {
  credentials: 'include',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const fetcher = (key, ...other) => get(key, ...other)

export async function get<T = any>(url: string, base: string = ''): Promise<T> {
  const r = await fetch(`${base}/api/v1${url}`, {
    ...requestInit,
    method: 'GET'
  })
  const json = await r.json()
  if (!r.ok) throw json.error
  return json
}

export async function post<T = any>(url: string, body: any): Promise<T> {
  const r = await fetch(`/api/v1${url}`, {
    ...requestInit,
    body: isString(body) ? body : JSON.stringify(body)
  })
  const json = await r.json()
  if (!r.ok) throw json.error
  return json
}

export async function put<T = any>(url: string, body: any): Promise<T> {
  const r = await fetch(`/api/v1${url}`, {
    ...requestInit,
    method: 'PUT',
    body: isString(body) ? body : JSON.stringify(body)
  })
  const json = await r.json()
  if (!r.ok) throw json.error
  return json
}

export async function del<T = any>(url: string): Promise<T> {
  const r = await fetch(`/api/v1${url}`, {
    ...requestInit,
    method: 'DELETE'
  })
  const json = await r.json()
  if (!r.ok) throw json.error
  return json
}
