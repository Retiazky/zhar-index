import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    ChallengeCompleted: event("0x3ecc666ff01338b0f16250426d0970be81cd025aae938564094a6e1e96786d30", "ChallengeCompleted(uint256,uint256,uint256,uint256)", {"challengeId": indexed(p.uint256), "zharriorReward": p.uint256, "igniterReward": p.uint256, "protocolReward": p.uint256}),
    ChallengeCreated: event("0xdc8e5155c1f416e66c1e039bb31e38cad0242f7f56b75555f6596de893f83173", "ChallengeCreated(uint256,address,address,uint256,uint256,string,uint256)", {"challengeId": indexed(p.uint256), "igniter": indexed(p.address), "forCreator": indexed(p.address), "expiration": p.uint256, "disputePeriod": p.uint256, "description": p.string, "challengeCreatorReward": p.uint256}),
    ChallengeDepositIncrease: event("0x0468b320dc5e60234d21d68dd98b49440a4de3e02571182f7ce9dd8bf80e4baf", "ChallengeDepositIncrease(uint256,address,uint256)", {"challengeId": indexed(p.uint256), "stoker": indexed(p.address), "amount": p.uint256}),
    ChallengeExpired: event("0x5e804f6ab65f629e96873f89acb6e5d1456139dc56369bcfc528171e348baa42", "ChallengeExpired(uint256)", {"challengeId": indexed(p.uint256)}),
    ChallengeFailed: event("0x10ab5dcdbc065ef28e74deaa88c647c7c94b810c035fb8da57f739d2336eecc2", "ChallengeFailed(uint256,uint256,uint256)", {"challengeId": indexed(p.uint256), "totalDisputeValue": p.uint256, "treasuryValue": p.uint256}),
    CreatorRegistered: event("0xc69c4b08ef3ac3499a548162bc0920f1f65d1559089f8c19d54ca0cb3b2651f6", "CreatorRegistered(address,string,string)", {"creator": indexed(p.address), "name": p.string, "metadataUri": p.string}),
    FireXPAwarded: event("0xa7c1f18fbc655c5abd5c513a477f4b218bc1adddff2d65aba143ab4dd4f7b766", "FireXPAwarded(address,uint256)", {"user": indexed(p.address), "amount": p.uint256}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", "Paused(address)", {"account": p.address}),
    ProofDisputed: event("0x9d1b2e7ff1b2d9bd50ad7a9b56ed20b9e647256d83a3e47699de26cfa86a106e", "ProofDisputed(uint256,address,uint256,uint256)", {"challengeId": indexed(p.uint256), "disputer": indexed(p.address), "disputeValue": p.uint256, "totalDisputeValue": p.uint256}),
    ProofSubmitted: event("0xc577bdeb8da1059fec56a8d1554e25846f18ebf046c214b145cac25f76bda350", "ProofSubmitted(uint256,string)", {"challengeId": indexed(p.uint256), "proofUri": p.string}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", "Unpaused(address)", {"account": p.address}),
}

export const functions = {
    DEFI_SHARE: viewFun("0x685f856e", "DEFI_SHARE()", {}, p.uint256),
    DISPUTE_THRESHOLD: viewFun("0xb9e9c8b4", "DISPUTE_THRESHOLD()", {}, p.uint256),
    MAX_IGNITER_CAP: viewFun("0x1c4a5064", "MAX_IGNITER_CAP()", {}, p.uint256),
    MAX_IGNITER_SHARE: viewFun("0x2b574316", "MAX_IGNITER_SHARE()", {}, p.uint256),
    ZHARRIOR_SHARE: viewFun("0xe3ef7863", "ZHARRIOR_SHARE()", {}, p.uint256),
    canUserDispute: viewFun("0x80edbeb6", "canUserDispute(uint256,address)", {"_challengeId": p.uint256, "_user": p.address}, p.bool),
    challengeCounter: viewFun("0xf7fed02c", "challengeCounter()", {}, p.uint256),
    challenges: viewFun("0x8f1d3776", "challenges(uint256)", {"_0": p.uint256}, {"challengeId": p.uint256, "forCreator": p.address, "igniter": p.address, "description": p.string, "treasury": p.uint256, "createdAt": p.uint256, "expiration": p.uint256, "challengeCreatorReward": p.uint256, "proofUri": p.string, "proofUpdatedAt": p.uint256, "claimedAt": p.uint256, "disputePeriod": p.uint256, "status": p.uint8, "totalDisputeValue": p.uint256}),
    claimRefund: fun("0x5b7baf64", "claimRefund(uint256)", {"_challengeId": p.uint256}, ),
    claimReward: fun("0xae169a50", "claimReward(uint256)", {"_challengeId": p.uint256}, ),
    createChallenge: fun("0x54de9bef", "createChallenge(address,string,uint256,uint256,uint256)", {"_forCreator": p.address, "_description": p.string, "_expiration": p.uint256, "_challengeCreatorReward": p.uint256, "_disputePeriod": p.uint256}, p.uint256),
    creators: viewFun("0x933166e1", "creators(address)", {"_0": p.address}, {"creator": p.address, "name": p.string, "metadataUri": p.string, "isActive": p.bool, "totalChallengesCompleted": p.uint256}),
    defiTreasury: viewFun("0x88ecc395", "defiTreasury()", {}, p.address),
    depositToChallenge: fun("0xa9709c19", "depositToChallenge(uint256,uint256)", {"_challengeId": p.uint256, "_amount": p.uint256}, ),
    disputeProof: fun("0x4927d753", "disputeProof(uint256)", {"_challengeId": p.uint256}, ),
    emergencyWithdraw: fun("0xe63ea408", "emergencyWithdraw(address,address,uint256)", {"_token": p.address, "_to": p.address, "_amount": p.uint256}, ),
    europToken: viewFun("0x935f1c42", "europToken()", {}, p.address),
    fireXPToken: viewFun("0x486e88d9", "fireXPToken()", {}, p.address),
    getChallengeDisputers: viewFun("0xdec9d804", "getChallengeDisputers(uint256)", {"_challengeId": p.uint256}, {"_0": p.array(p.address), "_1": p.array(p.uint256)}),
    getChallengeStakers: viewFun("0xe6be9e3b", "getChallengeStakers(uint256)", {"_challengeId": p.uint256}, {"_0": p.array(p.address), "_1": p.array(p.uint256)}),
    getDisputeStatus: viewFun("0x20f7aa3f", "getDisputeStatus(uint256)", {"_challengeId": p.uint256}, {"totalDisputeValue": p.uint256, "totalTreasury": p.uint256, "disputePercentage": p.uint256, "thresholdReached": p.bool, "timeLeft": p.uint256}),
    getUserChallenges: viewFun("0x11da8e54", "getUserChallenges(address)", {"_user": p.address}, p.array(p.uint256)),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pause: fun("0x8456cb59", "pause()", {}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    registerCreator: fun("0xb9f8d3b4", "registerCreator(string,string)", {"_name": p.string, "_metadataUri": p.string}, ),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    setDefiTreasury: fun("0x7abefdfc", "setDefiTreasury(address)", {"_newTreasury": p.address}, ),
    submitProof: fun("0x2af00510", "submitProof(uint256,string)", {"_challengeId": p.uint256, "_proofUri": p.string}, ),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    unpause: fun("0x3f4ba83a", "unpause()", {}, ),
    userChallenges: viewFun("0xa5ff0a13", "userChallenges(address,uint256)", {"_0": p.address, "_1": p.uint256}, p.uint256),
}

export class Contract extends ContractBase {

    DEFI_SHARE() {
        return this.eth_call(functions.DEFI_SHARE, {})
    }

    DISPUTE_THRESHOLD() {
        return this.eth_call(functions.DISPUTE_THRESHOLD, {})
    }

    MAX_IGNITER_CAP() {
        return this.eth_call(functions.MAX_IGNITER_CAP, {})
    }

    MAX_IGNITER_SHARE() {
        return this.eth_call(functions.MAX_IGNITER_SHARE, {})
    }

    ZHARRIOR_SHARE() {
        return this.eth_call(functions.ZHARRIOR_SHARE, {})
    }

    canUserDispute(_challengeId: CanUserDisputeParams["_challengeId"], _user: CanUserDisputeParams["_user"]) {
        return this.eth_call(functions.canUserDispute, {_challengeId, _user})
    }

    challengeCounter() {
        return this.eth_call(functions.challengeCounter, {})
    }

    challenges(_0: ChallengesParams["_0"]) {
        return this.eth_call(functions.challenges, {_0})
    }

    creators(_0: CreatorsParams["_0"]) {
        return this.eth_call(functions.creators, {_0})
    }

    defiTreasury() {
        return this.eth_call(functions.defiTreasury, {})
    }

    europToken() {
        return this.eth_call(functions.europToken, {})
    }

    fireXPToken() {
        return this.eth_call(functions.fireXPToken, {})
    }

    getChallengeDisputers(_challengeId: GetChallengeDisputersParams["_challengeId"]) {
        return this.eth_call(functions.getChallengeDisputers, {_challengeId})
    }

    getChallengeStakers(_challengeId: GetChallengeStakersParams["_challengeId"]) {
        return this.eth_call(functions.getChallengeStakers, {_challengeId})
    }

    getDisputeStatus(_challengeId: GetDisputeStatusParams["_challengeId"]) {
        return this.eth_call(functions.getDisputeStatus, {_challengeId})
    }

    getUserChallenges(_user: GetUserChallengesParams["_user"]) {
        return this.eth_call(functions.getUserChallenges, {_user})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }

    userChallenges(_0: UserChallengesParams["_0"], _1: UserChallengesParams["_1"]) {
        return this.eth_call(functions.userChallenges, {_0, _1})
    }
}

/// Event types
export type ChallengeCompletedEventArgs = EParams<typeof events.ChallengeCompleted>
export type ChallengeCreatedEventArgs = EParams<typeof events.ChallengeCreated>
export type ChallengeDepositIncreaseEventArgs = EParams<typeof events.ChallengeDepositIncrease>
export type ChallengeExpiredEventArgs = EParams<typeof events.ChallengeExpired>
export type ChallengeFailedEventArgs = EParams<typeof events.ChallengeFailed>
export type CreatorRegisteredEventArgs = EParams<typeof events.CreatorRegistered>
export type FireXPAwardedEventArgs = EParams<typeof events.FireXPAwarded>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PausedEventArgs = EParams<typeof events.Paused>
export type ProofDisputedEventArgs = EParams<typeof events.ProofDisputed>
export type ProofSubmittedEventArgs = EParams<typeof events.ProofSubmitted>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>

/// Function types
export type DEFI_SHAREParams = FunctionArguments<typeof functions.DEFI_SHARE>
export type DEFI_SHAREReturn = FunctionReturn<typeof functions.DEFI_SHARE>

export type DISPUTE_THRESHOLDParams = FunctionArguments<typeof functions.DISPUTE_THRESHOLD>
export type DISPUTE_THRESHOLDReturn = FunctionReturn<typeof functions.DISPUTE_THRESHOLD>

export type MAX_IGNITER_CAPParams = FunctionArguments<typeof functions.MAX_IGNITER_CAP>
export type MAX_IGNITER_CAPReturn = FunctionReturn<typeof functions.MAX_IGNITER_CAP>

export type MAX_IGNITER_SHAREParams = FunctionArguments<typeof functions.MAX_IGNITER_SHARE>
export type MAX_IGNITER_SHAREReturn = FunctionReturn<typeof functions.MAX_IGNITER_SHARE>

export type ZHARRIOR_SHAREParams = FunctionArguments<typeof functions.ZHARRIOR_SHARE>
export type ZHARRIOR_SHAREReturn = FunctionReturn<typeof functions.ZHARRIOR_SHARE>

export type CanUserDisputeParams = FunctionArguments<typeof functions.canUserDispute>
export type CanUserDisputeReturn = FunctionReturn<typeof functions.canUserDispute>

export type ChallengeCounterParams = FunctionArguments<typeof functions.challengeCounter>
export type ChallengeCounterReturn = FunctionReturn<typeof functions.challengeCounter>

export type ChallengesParams = FunctionArguments<typeof functions.challenges>
export type ChallengesReturn = FunctionReturn<typeof functions.challenges>

export type ClaimRefundParams = FunctionArguments<typeof functions.claimRefund>
export type ClaimRefundReturn = FunctionReturn<typeof functions.claimRefund>

export type ClaimRewardParams = FunctionArguments<typeof functions.claimReward>
export type ClaimRewardReturn = FunctionReturn<typeof functions.claimReward>

export type CreateChallengeParams = FunctionArguments<typeof functions.createChallenge>
export type CreateChallengeReturn = FunctionReturn<typeof functions.createChallenge>

export type CreatorsParams = FunctionArguments<typeof functions.creators>
export type CreatorsReturn = FunctionReturn<typeof functions.creators>

export type DefiTreasuryParams = FunctionArguments<typeof functions.defiTreasury>
export type DefiTreasuryReturn = FunctionReturn<typeof functions.defiTreasury>

export type DepositToChallengeParams = FunctionArguments<typeof functions.depositToChallenge>
export type DepositToChallengeReturn = FunctionReturn<typeof functions.depositToChallenge>

export type DisputeProofParams = FunctionArguments<typeof functions.disputeProof>
export type DisputeProofReturn = FunctionReturn<typeof functions.disputeProof>

export type EmergencyWithdrawParams = FunctionArguments<typeof functions.emergencyWithdraw>
export type EmergencyWithdrawReturn = FunctionReturn<typeof functions.emergencyWithdraw>

export type EuropTokenParams = FunctionArguments<typeof functions.europToken>
export type EuropTokenReturn = FunctionReturn<typeof functions.europToken>

export type FireXPTokenParams = FunctionArguments<typeof functions.fireXPToken>
export type FireXPTokenReturn = FunctionReturn<typeof functions.fireXPToken>

export type GetChallengeDisputersParams = FunctionArguments<typeof functions.getChallengeDisputers>
export type GetChallengeDisputersReturn = FunctionReturn<typeof functions.getChallengeDisputers>

export type GetChallengeStakersParams = FunctionArguments<typeof functions.getChallengeStakers>
export type GetChallengeStakersReturn = FunctionReturn<typeof functions.getChallengeStakers>

export type GetDisputeStatusParams = FunctionArguments<typeof functions.getDisputeStatus>
export type GetDisputeStatusReturn = FunctionReturn<typeof functions.getDisputeStatus>

export type GetUserChallengesParams = FunctionArguments<typeof functions.getUserChallenges>
export type GetUserChallengesReturn = FunctionReturn<typeof functions.getUserChallenges>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type RegisterCreatorParams = FunctionArguments<typeof functions.registerCreator>
export type RegisterCreatorReturn = FunctionReturn<typeof functions.registerCreator>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type SetDefiTreasuryParams = FunctionArguments<typeof functions.setDefiTreasury>
export type SetDefiTreasuryReturn = FunctionReturn<typeof functions.setDefiTreasury>

export type SubmitProofParams = FunctionArguments<typeof functions.submitProof>
export type SubmitProofReturn = FunctionReturn<typeof functions.submitProof>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type UserChallengesParams = FunctionArguments<typeof functions.userChallenges>
export type UserChallengesReturn = FunctionReturn<typeof functions.userChallenges>

