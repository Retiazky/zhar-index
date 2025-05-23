import { Log } from '../../../processor'
import { events } from '../../../abi/ZharChallenges'


export function getCreatorRegisteredEvent(ctx: Log) {
  const event = events.CreatorRegistered
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()

  return {
    creator: x.creator.toLowerCase(),
    name: x.name,
    metadataUri: x.metadataUri,
    contract,
  }
}

export function getChallengeCreatedEvent(ctx: Log) {
  const event = events.ChallengeCreated
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const id = x.challengeId.toString()

  return {
    id,
    challengeId: id,
    igniter: x.igniter.toLowerCase(),
    forCreator: x.forCreator.toLowerCase(),
    contract,
    expiration: Number(x.expiration * 1000n),
    disputePeriod: x.disputePeriod,
    description: x.description,
    reward: x.challengeCreatorReward,
  }
}

export function getChallengeDepositIncreaseEvent(ctx: Log) {
  const event = events.ChallengeDepositIncrease
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const id = x.challengeId.toString()

  return {
    id,
    challengeId: id,
    stoker: x.stoker.toLowerCase(),
    amount: x.amount,
    contract,
  }
}

export function getProofSubmittedEvent(ctx: Log) {
  const event = events.ProofSubmitted
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const id = x.challengeId.toString()

  return {
    id,
    challengeId: id,
    proofUri: x.proofUri,
    contract,
  }
}

export function getProofDisputedEvent(ctx: Log) {
  const event = events.ProofDisputed
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const id = x.challengeId.toString()

  return {
    id,
    challengeId: id,
    disputer: x.disputer.toLowerCase(),
    disputeValue: x.disputeValue,
    totalDisputeValue: x.totalDisputeValue,
    contract,
  }
}

export function getChallengeCompletedEvent(ctx: Log) {
  const event = events.ChallengeCompleted
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const id = x.challengeId.toString()

  return {
    id,
    challengeId: id,
    zharriorReward: x.zharriorReward,
    igniterReward: x.igniterReward,
    protocolReward: x.protocolReward,
    contract,
  }
}

export function getChallengeExpiredEvent(ctx: Log) {
  const event = events.ChallengeExpired
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const id = x.challengeId.toString()

  return {
    id,
    challengeId: id,
    contract,
  }
}

export function getChallengeFailedEvent(ctx: Log) {
  const event = events.ChallengeFailed
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const id = x.challengeId.toString()

  return {
    id,
    challengeId: id,
    totalDisputeValue: x.totalDisputeValue,
    treasuryValue: x.treasuryValue,
    contract,
  }
}
