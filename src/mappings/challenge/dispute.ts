import { create, get, getOrFail } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Challenge, Ember } from '../../model'
import { getProofDisputedEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'DISPUTE'

/**
 * Handle dispute of a challenge proof
 * Updates Challenge with dispute information
 * Logs DISPUTE event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleDispute(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getProofDisputedEvent)
  debug(OPERATION, { event }, true)

  // Get challenge
  const challenge = await getOrFail(store, Challenge, event.challengeId)

  // Get or create disputer
  let disputer = await get(store, Ember, event.disputer)
  if (!disputer) {
    disputer = create(Ember, event.disputer, {
      createdAt: new Date(context.block.timestamp),
      updatedAt: new Date(context.block.timestamp),
      blockNumber: BigInt(context.block.height),
    })
    await store.save(disputer)
  }

  // Update challenge 
  challenge.updatedAt = new Date(context.block.timestamp)
  // We could add additional fields to track disputes if needed
  
  await store.save(challenge)

  success(OPERATION, `Challenge: ${event.challengeId} - Disputer: ${event.disputer} - Dispute Value: ${event.disputeValue} - Total: ${event.totalDisputeValue}`)
}
