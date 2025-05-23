import { create, get, getOrFail } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'
import md5 from 'md5'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Challenge, Deposit, Ember } from '../../model'
import { getChallengeDepositIncreaseEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'DEPOSIT'

/**
 * Handle challenge deposit increase
 * Creates a new Deposit entity and updates Challenge
 * Logs DEPOSIT event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleDeposit(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getChallengeDepositIncreaseEvent)
  debug(OPERATION, { event }, true)

  // Get challenge
  const challenge = await getOrFail(store, Challenge, event.challengeId)

  // Get or create stoker
  let stoker = await get(store, Ember, event.stoker)
  if (!stoker) {
    stoker = create(Ember, event.stoker, {
      createdAt: new Date(context.block.timestamp),
      updatedAt: new Date(context.block.timestamp),
      blockNumber: BigInt(context.block.height),
    })
    await store.save(stoker)
  }

  // Create deposit record
  const depositId = md5(`${event.challengeId}-${event.stoker}-${context.block.height}`)
  const deposit = create(Deposit, depositId, {
    challenge,
    stoker,
    amount: event.amount,
    blockNumber: BigInt(context.block.height),
    createdAt: new Date(context.block.timestamp),
    txHash: context.transaction?.hash?.toLowerCase(),
  })
  
  await store.save(deposit)

  // Update challenge totals
  challenge.amount = challenge.amount + event.amount
  challenge.depositCount = challenge.depositCount + 1n
  challenge.volume = challenge.volume + event.amount
  challenge.updatedAt = new Date(context.block.timestamp)
  
  await store.save(challenge)

  success(OPERATION, `Challenge: ${event.challengeId} - Stoker: ${event.stoker} - Amount: ${event.amount}`)
}
