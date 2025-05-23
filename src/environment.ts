export type Chain = 'base'
export type ChainEnv = 'mainnet'
// | 'testnet'
type ChainWithEnv = `${Chain}-${ChainEnv}`
type PossibleChain = ChainWithEnv | `${Chain}-${string}`

export const CHAIN: PossibleChain = process.env.CHAIN as ChainWithEnv ||
  'base-mainnet'

export const STARTING_BLOCK = Number(process.env.STARTING_BLOCK || 0)
export const FINALITY_CONFIRMATION = Number(
  process.env.FINALITY_CONFIRMATION || 75,
)

export const ENV_CONTRACTS = {
  CHALLENGE: process.env.CONTRACT_ADDRESS || '',
  FIREXP: process.env.TOKEN_CONTRACT_ADDRESS || '',
}

if (!ENV_CONTRACTS.CHALLENGE) {
  throw new Error('CONTRACT_ADDRESS is not set')
}

const nodes: Record<PossibleChain, string> = {
  'base-mainnet': 'https://mainnet.base.org',
  'base-sepolia': 'https://sepolia.base.org',
}

// Setup
const ARCHIVE_URL = `https://v2.archive.subsquid.io/network/${CHAIN}`
const NODE_URL = nodes[CHAIN]

export const isProd = CHAIN.endsWith('mainnet')
export const disabledRPC = false // process.env.DISABLED_RPC === 'true' || !isProd

console.table({
  CHAIN,
  ARCHIVE_URL,
  NODE_URL,
  STARTING_BLOCK,
  CHALLENGE: ENV_CONTRACTS.CHALLENGE,
  disabledRPC,
  environment: isProd ? 'production' : 'development',
})

export const getArchiveUrl = (): string => ARCHIVE_URL
export const getNodeUrl = (): string => NODE_URL
