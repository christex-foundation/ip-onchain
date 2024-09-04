//@ts-check
import { createConfiguredUmi } from '../factories/umiFactory.js';
import { registerWithARIPO } from '../services/aripoService.js';
import { mintTrademarkNFT } from '../services/metaplexService.js';

/**
 * @typedef {import('@metaplex-foundation/umi').Keypair} Keypair
 * @typedef {import('../services/aripoService').IpData} IpData
 */

/**
 * Mints an NFT representing Trademark IP registered with ARIPO
 * @param {Object} config - Configuration object
 * @param {Uint8Array} config.keypair - The keypair to use for minting
 * @param {IpData} config.ipData - The IP data to register and mint
 * @returns {Promise<{aripoRegistration: string, nftPublicKey: string}>}
 */
export async function createTrademark({ keypair, ipData }) {
	const umi = createConfiguredUmi({ keypair });
	const aripoData = await registerWithARIPO(ipData);
	const nftPublicKey = await mintTrademarkNFT(umi, aripoData);

	return {
		aripoRegistration: aripoData.registrationNumber,
		nftPublicKey: nftPublicKey.toString()
	};
}
