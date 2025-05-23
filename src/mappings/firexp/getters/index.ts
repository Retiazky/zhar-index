import { Log } from '../../../processor'
import { events } from '../../../abi/erc20'
import { ADDRESS_ZERO } from '../../utils/evm'

export function getTokenTransferEvent(ctx: Log) {
  const event = events.Transfer
  const x = event.decode(ctx)
  const contract = ctx.address.toLowerCase()
  const from = x.from.toLowerCase()
  const to = x.to.toLowerCase()
  const id = ADDRESS_ZERO === from ? to : from
  const isBurn = ADDRESS_ZERO === from

  return {
    id,
    from: x.from.toLowerCase(),
    to: x.to.toLowerCase(),
    amount: x.value,
    contract,
    isBurn,
  }
}
