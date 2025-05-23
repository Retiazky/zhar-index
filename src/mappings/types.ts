import { Store } from '@subsquid/typeorm-store'
import { Block, Fields, Log, Process, Transaction } from '../processor'
import { BlockData } from '@subsquid/evm-processor'

export type BaseCall = {
  caller: string
  blockNumber: string
  timestamp: Date
}

export type CallWith<T> = BaseCall & T
export type UnwrapFunc<T> = (ctx: Log) => T

export type Context<S = Store> = {
  store: S
  block: BlockData
  event: Log
  call: Transaction | undefined
}

export { Block, BlockData, Fields, Log, Process, Transaction }
