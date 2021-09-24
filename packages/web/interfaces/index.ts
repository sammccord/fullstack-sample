import pino from 'pino'
import { VercelRequest, VercelResponse } from '@vercel/node'
import { Methods } from 'trouter'

export type AsyncVoid = void | Promise<void>
export type NowFunction = (
  req: ExtendedRequest,
  res: VercelResponse
) => AsyncVoid | VercelResponse | Promise<VercelResponse>

export type MiddlewareFunction = (
  req: VercelRequest,
  res: VercelResponse,
  next: Function
) => AsyncVoid

export interface ExtendedRequest<Params = any> extends VercelRequest {
  method: Methods
  params?: Params
  log: pino.Logger
  mixpanelProps: { distinct_id: string; ip: string }
}

export interface Error {
  error: { message: string }
}
