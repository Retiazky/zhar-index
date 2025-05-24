import { Log } from '../../../processor'
import { events } from '../../../abi/erc20'
import { ADDRESS_ZERO } from '../../utils/evm'

export function getTokenTransferEvent(ctx: Log) {
  const event = events.Transfer
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const from = x.from.toLowerCase()
  const to = x.to.toLowerCase()
  const fromId = contract +'_'+ from
  const toId = contract +'_'+ to
  const isBurn = ADDRESS_ZERO === to

  return {
    from: x.from.toLowerCase(),
    to: x.to.toLowerCase(),
    fromId,
    toId,
    amount: x.value,
    contract,
    isBurn,
  }
}
