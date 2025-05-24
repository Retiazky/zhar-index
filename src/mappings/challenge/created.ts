import { create, get, getOrCreate } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Challenge, ChallengeStatus, Ember } from '../../model'
import { getChallengeCreatedEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'CREATED'

/**
 * Handle the creation of a new challenge
 * Creates a new Challenge entity
 * Logs CREATED event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleChallengeCreated(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getChallengeCreatedEvent)
  debug(OPERATION, { event }, true)

  // Get or create igniter
  let igniter = await get(store, Ember, event.igniter)
  if (!igniter) {
    igniter = create(Ember, event.igniter, {
      createdAt: new Date(context.block.timestamp),
      updatedAt: new Date(context.block.timestamp),
      blockNumber: BigInt(context.block.height),
    })
    await store.save(igniter)
  }

  // Get or create creator (zharrior)
  let zharrior = await get(store, Ember, event.forCreator)
  if (!zharrior) {
    zharrior = create(Ember, event.forCreator, {
      createdAt: new Date(context.block.timestamp),
      updatedAt: new Date(context.block.timestamp),
      blockNumber: BigInt(context.block.height),
    })
    await store.save(zharrior)
  }

  // Create challenge
  const challenge = await getOrCreate(store, Challenge, event.challengeId, {
    amount: event.amount,
    blockNumber: BigInt(context.block.height),
    createdAt: new Date(context.block.timestamp),
    updatedAt: new Date(context.block.timestamp),
    contract: event.contract,
    igniter,
    zharrior,
    depositCount: 0n,
    volume: event.amount,
    expiration: new Date(event.expiration),
    disputePeriod: event.disputePeriod,
    description: event.description,
    reward: event.reward,
    status: ChallengeStatus.Active,
  })

  await store.save(challenge)

  success(OPERATION, `${event.challengeId} - Igniter: ${event.igniter} - Creator: ${event.forCreator}`)
}
