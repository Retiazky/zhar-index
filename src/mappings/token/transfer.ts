import {
  create,
  getOrCreate,
  get,
  getWith,
} from '@kodadot1/metasquid/entity'
import { debug, pending, skip, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Ember, Token } from '../../model'
import { getTokenTransferEvent } from './getters'
import { unwrap } from '../utils/extract'
import { Store } from '@subsquid/typeorm-store'
import md5 from 'md5'
import { ADDRESS_ZERO } from '../utils/evm'

const OPERATION = 'TRANSFER'

/**
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleTransfer(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getTokenTransferEvent)
  debug(OPERATION, { event }, true)

  let from = await get(store, Token, event.fromId)
  let to = await get(store, Token, event.toId)

  if (!from) {
    let ember = await get(store, Ember, event.from)
    if (!ember) {
      ember = create(Ember, event.from, {
        createdAt: event.timestamp,
        updatedAt: event.timestamp,
        blockNumber: BigInt(context.block.height),
      })
      await store.save(ember)
    }
    from = create(Token, event.fromId, {
      id: event.fromId,
      blockNumber: BigInt(context.block.height),
      createdAt: event.timestamp,
      updatedAt: event.timestamp,
      contract: event.contract,
      ember: ember,
      amount: 0n,
    })
  }
  if (!to) {
    let ember = await get(store, Ember, event.to)
    if (!ember) {
      ember = create(Ember, event.to, {
      createdAt: event.timestamp,
      updatedAt: event.timestamp,
      blockNumber: BigInt(context.block.height),
      })
      await store.save(ember)
    }
    to = create(Token, event.toId, {
      id: event.toId,
      blockNumber: BigInt(context.block.height),
      createdAt: event.timestamp,
      updatedAt: event.timestamp,
      contract: event.contract,
      ember: ember,
      amount: 0n,
    })
  }

  from.amount = from.amount - event.amount
  to.amount = to.amount + event.amount
  from.updatedAt = event.timestamp
  to.updatedAt = event.timestamp

  await store.save([from, to])

  // if (!xp) {
  //   if (event.isBurn) {
  //     throw new Error('Burn event without XP record')
  //   }

  //   xp = create(FireXP, event.id, {
  //     blockNumber: BigInt(context.block.height),
  //     ember: event.to,
  //     createdAt: event.timestamp,
  //     updatedAt: event.timestamp,
  //     amount: 0n,
  //   })
  // }

  // if (event.isBurn) {
  //   xp.amount = xp.amount - event.amount
  // } else {
  //   xp.amount = xp.amount + event.amount
  // }

  // xp.updatedAt = event.timestamp

  // await store.save(xp)


  // success(
  //   OPERATION,
  //   `${xp.id} ${event.isBurn ? 'LOST' : 'GOT'} ${event.amount} XP`,
  // )
}
