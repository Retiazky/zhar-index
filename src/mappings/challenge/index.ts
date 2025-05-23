import { logger } from '@kodadot1/metasquid/logger'
import { Store } from '@subsquid/typeorm-store'
import { events } from '../../abi/ZharChallenges'
import { Log } from '../../processor'
import { mainTopic } from '../utils/evm'
import { unwrap } from '../utils/extract'
import { warn } from '../utils/logger'
import { handleRegister } from './register'
import { handleChallengeCreated } from './created'
import { handleDeposit } from './deposit'
import { handleProofSubmitted } from './proof'
import { handleDispute } from './dispute'
import { handleChallengeComplete } from './complete'
import { handleChallengeExpire } from './expire'
import { handleChallengeFail } from './fail'
import * as proc from './getters'

export const ZHAR = {
  REGISTER: events.CreatorRegistered.topic,
  CREATED: events.ChallengeCreated.topic,
  DEPOSIT: events.ChallengeDepositIncrease.topic,
  PROOF: events.ProofSubmitted.topic,
  DISPUTE: events.ProofDisputed.topic,
  COMPLETE: events.ChallengeCompleted.topic,
  EXPIRE: events.ChallengeExpired.topic,
  FAIL: events.ChallengeFailed.topic,
}

export async function handler(log: Log, store: Store) {
  switch (mainTopic(log)) {

    case ZHAR.REGISTER:
      await handleRegister(log, store).then(() => logger.info('REGISTER OK'))
      return unwrap(log, proc.getCreatorRegisteredEvent)
    case ZHAR.CREATED:
      await handleChallengeCreated(log, store).then(() => logger.info('CHALLENGE CREATE OK'))
      return unwrap(log, proc.getChallengeCreatedEvent)
    case ZHAR.DEPOSIT:
      await handleDeposit(log, store).then(() => logger.info('DEPOSIT OK'))
      return unwrap(log, proc.getChallengeDepositIncreaseEvent)
    case ZHAR.PROOF:
      await handleProofSubmitted(log, store).then(() => logger.info('PROOF OK'))
      return unwrap(log, proc.getProofSubmittedEvent)
    case ZHAR.DISPUTE:
      await handleDispute(log, store).then(() => logger.info('DISPUTE OK'))
      return unwrap(log, proc.getProofDisputedEvent)
    case ZHAR.COMPLETE:
      await handleChallengeComplete(log, store).then(() => logger.info('COMPLETE OK'))
      return unwrap(log, proc.getChallengeCompletedEvent)
    case ZHAR.EXPIRE:
      await handleChallengeExpire(log, store).then(() => logger.info('EXPIRE OK'))
      return unwrap(log, proc.getChallengeExpiredEvent)
    case ZHAR.FAIL:
      await handleChallengeFail(log, store).then(() => logger.info('FAIL OK'))
      return unwrap(log, proc.getChallengeFailedEvent)
    default:
      warn('ZHAR' as any, 'no such handler')
      return null
  }
}