//@ts-check

import { create } from '@metaplex-foundation/mpl-core';
import { base58 } from '@metaplex-foundation/umi/serializers';
import { generateSigner } from '@metaplex-foundation/umi';
import { createTrademarkMetadata } from './aripoService';
/**
 * @typedef {import('@metaplex-foundation/umi').Umi} Umi
 * @typedef {import('./aripoService').AripoRegistration} AripoRegistration
 */

/**
 * Mints an NFT representing the IP
 * @param {Umi} umi - The Umi instance
 * @param {AripoRegistration} aripoData - The ARIPO registration data
 * @returns {Promise<import('@metaplex-foundation/umi').PublicKey>}
 */
export async function mintTrademarkNFT(umi, aripoData) {
	const metadata = createTrademarkMetadata(aripoData);
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
