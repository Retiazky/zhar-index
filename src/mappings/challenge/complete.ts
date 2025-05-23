import { getOrFail } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Challenge, ChallengeStatus } from '../../model'
import { getChallengeCompletedEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'COMPLETE'

/**
 * Handle completion of a challenge
 * Updates Challenge status and reward information
 * Logs COMPLETE event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleChallengeComplete(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getChallengeCompletedEvent)
  debug(OPERATION, { event }, true)

  // Get challenge
  const challenge = await getOrFail(store, Challenge, event.challengeId)

  // Update challenge status and rewards
  challenge.status = ChallengeStatus.Completed
  challenge.updatedAt = new Date(context.block.timestamp)
  
  await store.save(challenge)

  success(OPERATION, `Challenge: ${event.challengeId} - Zharrior Reward: ${event.zharriorReward} - Igniter Reward: ${event.igniterReward} - Protocol Reward: ${event.protocolReward}`)
}
