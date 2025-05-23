import { getOrFail } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Challenge, ChallengeStatus } from '../../model'
import { getProofSubmittedEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'PROOF'

/**
 * Handle proof submission for a challenge
 * Updates Challenge with proof URI and status
 * Logs PROOF event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleProofSubmitted(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getProofSubmittedEvent)
  debug(OPERATION, { event }, true)

  // Get challenge
  const challenge = await getOrFail(store, Challenge, event.challengeId)

  // Update challenge with proof URI and status
  challenge.uri = event.proofUri
  challenge.status = ChallengeStatus.ProofSubmitted
  challenge.updatedAt = new Date(context.block.timestamp)
  
  await store.save(challenge)

  success(OPERATION, `Challenge: ${event.challengeId} - Proof URI: ${event.proofUri}`)
}
