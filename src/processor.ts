import {
  BlockHeader,
  DataHandlerContext,
  EvmBatchProcessor,
  EvmBatchProcessorFields,
  Log as _Log,
  Transaction as _Transaction,
} from '@subsquid/evm-processor'
import { Store } from '@subsquid/typeorm-store'

import {
  disabledRPC,
  ENV_CONTRACTS,
  FINALITY_CONFIRMATION,
  getArchiveUrl,
  getNodeUrl,
  STARTING_BLOCK,
} from './environment'
import { ZHAR } from './mappings/challenge'

const archive = getArchiveUrl()
const chain = getNodeUrl()

export const processor = new EvmBatchProcessor()
  .setGateway(archive)
  .setRpcEndpoint({
    url: chain,
    rateLimit: 15,
  })
  .setFinalityConfirmation(FINALITY_CONFIRMATION)
  .setRpcDataIngestionSettings({ disabled: disabledRPC })
  .setFields({
    log: {
      topics: true,
      data: true,
    },
    transaction: {
      hash: true,
    },
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.REGISTER],
    transaction: true,
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.CREATED],
    transaction: true,
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.DEPOSIT],
    transaction: true,
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.PROOF],
    transaction: true,
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.DISPUTE],
    transaction: true,
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.COMPLETE],
    transaction: true,
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.EXPIRE],
    transaction: true,
  })
  .addLog({
    address: [ENV_CONTRACTS.CHALLENGE],
    topic0: [ZHAR.FAIL],
    transaction: true,
  })
  .setBlockRange({
    from: STARTING_BLOCK,
  })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Process = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
