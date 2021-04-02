import { ParsedUrlQuery } from 'node:querystring'

export function parsePageQueryParam(query: ParsedUrlQuery): number {
  return Number.parseInt(query.page as string, 10) || 1
}
