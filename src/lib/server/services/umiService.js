//@ts-check
import { mplCore } from '@metaplex-foundation/mpl-core';
import { keypairIdentity, sol } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { RPC_ENDPOINT, IRYS_ADDRESS } from '../config.js';

/**
 * @typedef {import('@metaplex-foundation/umi').Umi} Umi
 * @typedef {import('@metaplex-foundation/umi').PublicKey} PublicKey
 * @typedef {import('@metaplex-foundation/umi').Keypair} Keypair
 */

/**
 * Creates a new Umi instance
 * @param {string} [endpoint=RPC_ENDPOINT] - The RPC endpoint
 * @returns {Umi} A configured Umi instance
 */
export function createUmiInstance(endpoint = RPC_ENDPOINT) {
	return createUmi(endpoint)
		.use(mplCore())
		.use(irysUploader({ address: IRYS_ADDRESS }));
}

/**
 * Sets up Umi with a keypair
 * @param {Umi} umi - The Umi instance
 * @param {Keypair} keypair - The keypair to use
 * @returns {Umi} The configured Umi instance
 */
export function setupUmiWithKeypair(umi, keypair) {
	return umi.use(keypairIdentity(keypair));
}
