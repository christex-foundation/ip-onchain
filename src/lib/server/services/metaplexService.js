//@ts-check

import { create } from '@metaplex-foundation/mpl-core';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { generateSigner } from '@metaplex-foundation/umi';
/**
 * @typedef {import('@metaplex-foundation/umi').Umi} Umi
 * @typedef {import('./aripoService').AripoRegistration} AripoRegistration
 */

/**
 * Creates metadata for the NFT
 * @typedef Object
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {string} external_url
 * @property {Array<any>} attributes
 * @property {any} properties
 * @param {AripoRegistration} aripoData - The ARIPO registration data
 * @returns {Object} The NFT metadata
 */
function createMetadata(aripoData) {
	return {
		name: `${aripoData.name} - ARIPO Registration`,
		description: `ARIPO Registration for ${aripoData.name}`,
		image: aripoData.image,
		external_url: 'https://aripo.org',
		attributes: [
			{ trait_type: 'Registration Number', value: aripoData.registrationNumber },
			{ trait_type: 'Registration Date', value: aripoData.registrationDate },
			{ trait_type: 'IP Type', value: aripoData.type }
		],
		properties: {
			files: [{ uri: aripoData.image, type: 'image/png' }],
			category: 'image'
		}
	};
}

/**
 * Mints an NFT representing the IP
 * @param {Umi} umi - The Umi instance
 * @param {AripoRegistration} aripoData - The ARIPO registration data
 * @returns {Promise<import('@metaplex-foundation/umi').PublicKey>}
 */
export async function mintIPNFT(umi, aripoData) {
	const metadata = createMetadata(aripoData);
	console.log('Uploading Metadata...');
	const metadataUri = await umi.uploader.uploadJson(metadata);

	const nftSigner = generateSigner(umi);

	console.log('Minting NFT...');
	const tx = await create(umi, {
		asset: nftSigner,
		name: metadata.name,
		uri: metadataUri
	}).sendAndConfirm(umi);

	const signature = base58.deserialize(tx.signature)[0];

	console.log('\nNFT Minted');
	console.log('Transaction:', `https://explorer.solana.com/tx/${signature}?cluster=devnet`);
	console.log('NFT:', `https://core.metaplex.com/explorer/${nftSigner.publicKey}?env=devnet`);

	return nftSigner.publicKey;
}
