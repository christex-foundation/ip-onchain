//@ts-check
import { createConfiguredUmi } from '../factories/umiFactory.js';
import { registerWithARIPO } from '../services/aripoService.js';
import { mintIPNFT } from '../services/metaplexService.js';

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
export async function mintAripoNft({ keypair, ipData }) {
	const umi = createConfiguredUmi({ keypair });
	const aripoData = await registerWithARIPO(ipData);
	const nftPublicKey = await mintIPNFT(umi, aripoData);

	return {
		aripoRegistration: aripoData.registrationNumber,
		nftPublicKey: nftPublicKey.toString()
	};
}
