//@ts-check
import { env } from '$env/dynamic/private';

export const RPC_ENDPOINT = env.PRIVATE_RPC_ENDPOINT || 'https://api.devnet.solana.com';
export const IRYS_ADDRESS = env.PRIVATE_IRYS_ADDRESS || 'https://devnet.irys.xyz';
export const KEYPAIR = env.PRIVATE_KEYPAIR;
