import { BlockHeader } from '@subsquid/evm-processor'
import { Log, Process } from '../../processor'
import { LogEvent } from '../../abi/abi.support'
import { Optional } from '@kodadot1/metasquid/types'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export function topicOf<T>(ctx: LogEvent<T>): string {
  return ctx.topic
}

export function mainTopic(ctx: Log): string {
  return ctx.topics[0]
}

export function lastBatchBlock(ctx: Process): BlockHeader {
  return ctx.blocks[ctx.blocks.length - 1].header
}

export function tokenUri(
  baseUri: Optional<string>,
  tokenId: Optional<string | bigint>,
): string {
  if (!baseUri || tokenId == undefined) {
    return ''
  }
  const uri = baseUri.endsWith('/') ? baseUri : `${baseUri}/`
  return `${uri}${tokenId}`
}

export function tokenName(
  baseName: Optional<string>,
  tokenId: Optional<string | bigint>,
): string {
  if (!baseName || tokenId !== undefined) {
    return ''
  }
  return `${baseName} #${tokenId}`
}
