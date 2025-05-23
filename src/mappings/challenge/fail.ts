import { getOrFail } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Challenge, ChallengeStatus } from '../../model'
import { getChallengeFailedEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'FAIL'

/**
 * Handle failure of a challenge
 * Updates Challenge status to failed
 * Logs FAIL event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleChallengeFail(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getChallengeFailedEvent)
  debug(OPERATION, { event }, true)

  // Get challenge
  const challenge = await getOrFail(store, Challenge, event.challengeId)

  // Update challenge status
  challenge.status = ChallengeStatus.Failed
  challenge.updatedAt = new Date(context.block.timestamp)
  
  await store.save(challenge)

  success(OPERATION, `Challenge: ${event.challengeId} failed - Total Dispute: ${event.totalDisputeValue} - Treasury: ${event.treasuryValue}`)
}
