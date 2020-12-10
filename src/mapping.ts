import { BigInt } from "@graphprotocol/graph-ts"
import {
  RewardPaid,
  Staked,
  Withdrawn
} from "../generated/zGovernance/zGovernance"
import { zGovernanceEvent } from "../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts/chain/ethereum"

export function handleRewardPaid(event: RewardPaid): void {
    let id = event.transaction.hash.toHexString().concat('-').concat(event.logIndex.toString())
    let zGovernanceEvent = new zGovernanceEvent(id)
    zGovernanceEvent.txHash = event.transaction.hash
    zGovernanceEvent.eventType = "REWARD"
    zGovernanceEvent.amount = event.params.reward
    setPropertiesAndSave(event, zGovernanceEvent)
}

export function handleStaked(event: Staked): void {
    let id = event.transaction.hash.toHexString().concat('-').concat(event.logIndex.toString())
    let zGovernanceEvent = new zGovernanceEvent(id)
    zGovernanceEvent.txHash = event.transaction.hash
    zGovernanceEvent.eventType = "STAKE"
    zGovernanceEvent.amount = event.params.amount
    setPropertiesAndSave(event, zGovernanceEvent)
}

export function handleWithdrawn(event: Withdrawn): void {
    let id = event.transaction.hash.toHexString().concat('-').concat(event.logIndex.toString())
    let zGovernanceEvent = new zGovernanceEvent(id)
    zGovernanceEvent.txHash = event.transaction.hash
    zGovernanceEvent.eventType = "WITHDRAWAL"
    zGovernanceEvent.amount = event.params.amount
    setPropertiesAndSave(event, zGovernanceEvent)
}

function setPropertiesAndSave(event: ethereum.Event, zGovernanceEvent: zGovernanceEvent): void {
    zGovernanceEvent.user = event.transaction.from
    zGovernanceEvent.blockNumber = event.block.number
    zGovernanceEvent.blockTimestamp = event.block.timestamp
    zGovernanceEvent.save()
}