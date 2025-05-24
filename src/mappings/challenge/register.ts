import { create, get, getOrCreate } from '@kodadot1/metasquid/entity'
import { Store } from '@subsquid/typeorm-store'

import { debug, pending, success } from '../utils/logger'
import { Log as Context } from '../types'
import { Ember, Metadata } from '../../model'
import { getCreatorRegisteredEvent } from './getters'
import { unwrap } from '../utils/extract'

const OPERATION = 'REGISTER'

/**
 * Handle the registration of a new creator
 * Creates a new Ember entity with metadata
 * Logs REGISTER event
 * @param context - the Log of the Event
 * @param store - TypeORM store
 * @returns {Promise<void>}
 */
export async function handleRegister(
  context: Context,
  store: Store,
): Promise<void> {
  pending(OPERATION, `${context.block.height}`)
  const event = unwrap(context, getCreatorRegisteredEvent)
  debug(OPERATION, { event }, true)

  let ember = await get(store, Ember, event.creator)
  const timestamp = new Date(context.block.timestamp)

  // Create metadata entity
  const metadataId = `${event.creator}-${context.block.height}`
  const metadata = await getOrCreate(store, Metadata, metadataId, {
    // uri: event.metadataUri,
    // createdAt: event.timestamp,
  })
  
  await store.save(metadata)

  // Create or update ember entity
  if (!ember) {
    ember = create(Ember, event.creator, {
      name: event.name,
      metadata,
      createdAt: timestamp,
      updatedAt: timestamp,
      totalXp: 0n,
      blockNumber: BigInt(context.block.height),
    })
  } else {
    ember.name = event.name
    ember.metadata = metadata
    ember.updatedAt = timestamp
  }

  await store.save(ember)

  success(OPERATION, `${event.creator} - ${event.name}`)
}
