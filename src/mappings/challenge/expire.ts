import { getOrFail } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Challenge, ChallengeStatus } from '../../model'
import { getChallengeExpiredEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'EXPIRE'

/**
 * Handle expiration of a challenge
 * Updates Challenge status to expired
 * Logs EXPIRE event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleChallengeExpire(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getChallengeExpiredEvent)
  debug(OPERATION, { event }, true)

  // Get challenge
  const challenge = await getOrFail(store, Challenge, event.challengeId)

  // Update challenge status
  challenge.status = ChallengeStatus.Expired
  challenge.updatedAt = new Date(context.block.timestamp)
  
  await store.save(challenge)

  success(OPERATION, `Challenge: ${event.challengeId} expired`)
}
