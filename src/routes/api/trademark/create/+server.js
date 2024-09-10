//@ts-check
import { json } from '@sveltejs/kit';
import { createTrademark } from '$lib/server/strategies/trademarkMintingStrategy';
import { KEYPAIR } from '$lib/server/config';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { ipData } = await request.json();
		const keypair = Uint8Array.from(JSON.parse(KEYPAIR));

		const result = await createTrademark({ keypair, ipData });

		return json({ success: true, ...result });
	} catch (error) {
		console.error('Error minting IP NFT:', error);
		return json({ success: false, error: 'Failed to mint IP NFT' }, { status: 500 });
	}
}
