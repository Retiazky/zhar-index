import { logger } from '@kodadot1/metasquid/logger'
import { ENV_CONTRACTS } from '../environment'
import { Process } from '../processor'
import { handler as challengeHandler } from './challenge'
import { handler as tokenHandler } from './token'
import { mainTopic } from './utils/evm'
import { debug } from './utils/logger'

export async function mainFrame(ctx: Process): Promise<void> {
  logger.info(
    `Processing ${ctx.blocks.length} blocks from ${
      ctx.blocks[0].header.height
    } to ${ctx.blocks[ctx.blocks.length - 1].header.height}`,
  )

  for (const block of ctx.blocks) {
    for (const log of block.logs) {
      if (log.address === ENV_CONTRACTS.CHALLENGE) {
        const topic = mainTopic(log)
        const data = await challengeHandler(log, ctx.store)
        debug('keyHandler', { topic, data }, true)
      } else if (log.address === ENV_CONTRACTS.FIREXP || log.address === ENV_CONTRACTS.EUROP) {
        const topic = mainTopic(log)
        const data = await tokenHandler(log, ctx.store)
        debug('keyHandler', { topic, data }, true)
      }
    }
  }
}
