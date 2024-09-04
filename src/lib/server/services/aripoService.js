//@ts-check

/**
 * @typedef {Object} IpData
 * @property {string} name
 * @property {string} type
 * @property {string} image
 */

/**
 * @typedef {Object} AripoRegistration
 * @property {string} registrationNumber
 * @property {string} registrationDate
 * @property {string} name
 * @property {string} type
 * @property {string} image
 */

/**
 * Simulates registering IP with ARIPO
 * @param {IpData} ipData - The IP data to register
 * @returns {Promise<AripoRegistration>}
 */
export async function registerWithARIPO(ipData) {
	console.log('Registering IP with ARIPO:', ipData);
	return {
		registrationNumber: 'ARIPO' + Math.floor(Math.random() * 1000000),
		registrationDate: new Date().toISOString(),
		...ipData
	};
}

/**
 * @typedef {import('@metaplex-foundation/umi').Umi} Umi
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
export function createTrademarkMetadata(aripoData) {
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
