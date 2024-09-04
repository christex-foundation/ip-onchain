//@ts-check
import { createUmiInstance, setupUmiWithKeypair } from '../services/umiService.js';
import { RPC_ENDPOINT } from '../config.js';

/**
 * @typedef {import('@metaplex-foundation/umi').Umi} Umi
 */

/**
 * Creates a configured Umi instance
 * @param {Object} config - Configuration object
 * @param {string} [config.endpoint=RPC_ENDPOINT] - The RPC endpoint
 * @param {Uint8Array} [config.keypair] - The keypair to use
 * @returns {Umi} A configured Umi instance
 */
export function createConfiguredUmi({ endpoint = RPC_ENDPOINT, keypair: secretKey }) {
	let umi = createUmiInstance(endpoint);

	if (secretKey) {
		const keypair = umi.eddsa.createKeypairFromSecretKey(secretKey);
		umi = setupUmiWithKeypair(umi, keypair);
	}

	return umi;
}
