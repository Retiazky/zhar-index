import { logger } from '@kodadot1/metasquid/logger'
import { Store } from '@subsquid/typeorm-store'
import { events } from '../../abi/erc20'
import { Log } from '../../processor'
import { mainTopic } from '../utils/evm'
import { unwrap } from '../utils/extract'
import { warn } from '../utils/logger'
import { handleTransfer } from './transfer'
import * as proc from './getters'

export const TOKEN = {
  TRANSFER: events.Transfer.topic,
}

export async function handler(log: Log, store: Store) {
  logger.info(`Handling log: ${log.id} with topic ${mainTopic(log)}`)
  switch (mainTopic(log)) {

    case TOKEN.TRANSFER:
      logger.info('Handling transfer event')
      await handleTransfer(log, store).then(() => logger.info('REGISTER OK'))
      return unwrap(log, proc.getTokenTransferEvent)
    default:
      warn('FIRE_XP' as any, 'no such handler')
      return null
  }
}