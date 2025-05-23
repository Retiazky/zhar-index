import {
  create,
  getOrCreate,
  getOrFail as get,
  getWith,
} from '@kodadot1/metasquid/entity'
import { debug, pending, skip, success } from '../utils/logger'
import { Log as Context } from '../types'
import { FireXP } from '../../model'
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

  if (!(event.from === ADDRESS_ZERO || event.to === ADDRESS_ZERO)) {
    skip(OPERATION, `Transfer is not permitted between addresses`)
    return void 0
  }

  let xp = await get(store, FireXP, event.id)

  if (!xp) {
    if (event.isBurn) {
      throw new Error('Burn event without XP record')
    }

    xp = create(FireXP, event.id, {
      blockNumber: BigInt(context.block.height),
      createdAt: event.timestamp,
      updatedAt: event.timestamp,
      amount: 0n,
    })
  }

  if (event.isBurn) {
    xp.amount = xp.amount - event.amount
  } else {
    xp.amount = xp.amount + event.amount
  }

  xp.updatedAt = event.timestamp

  await store.save(xp)


  success(
    OPERATION,
    `${xp.id} ${event.isBurn ? 'LOST' : 'GOT'} ${event.amount} XP`,
  )
}
