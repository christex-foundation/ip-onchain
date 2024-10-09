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
 * @typedef {Object} NFTMetadata
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {string} external_url
 * @property {Array<{trait_type: string, value: any}>} attributes
 * @property {Object} properties
 *
 * @param {AripoRegistration & {upload: Object, appearance: Object, filings: Object}} aripoData - The ARIPO registration data with additional properties
 * @returns {NFTMetadata} The NFT metadata
 */
export function createTrademarkMetadata(aripoData) {
	return {
		name: `${aripoData.name} - ARIPO Registration`,
		description: `ARIPO Registration for ${aripoData.name}`,
		image: 'https://superteam.fun/_app/immutable/assets/superteam_footer.f45ab4df.svg',
		external_url: 'https://aripo.org',
		attributes: [
			{ trait_type: 'Registration Number', value: aripoData.registrationNumber },
			{ trait_type: 'Registration Date', value: aripoData.registrationDate },
			{ trait_type: 'IP Type', value: aripoData.type },
			{
				trait_type: 'Dominant Colors',
				value: aripoData.upload.visionData.dominantColours.join(', ')
			},
			{ trait_type: 'Vision Attributes', value: aripoData.upload.visionData.attributes.join(', ') },
			{ trait_type: 'Confidence Level', value: aripoData.upload.visionData.confidenceLevel },
			{ trait_type: 'Detected Words', value: aripoData.upload.visionData.words.join(', ') },
			{ trait_type: 'Goods and Services', value: aripoData.appearance.goodsAndServices.join(', ') },
			{
				trait_type: 'Has Previous Filing',
				value: aripoData.filings.radioValue === 'yes' ? 'Yes' : 'No'
			},
			{ trait_type: 'Filing Country', value: aripoData.filings.country }
		],
		properties: {
			files: [
				{
					uri: 'https://superteam.fun/_app/immutable/assets/superteam_footer.f45ab4df.svg',
					type: 'image/svg'
				}
			],
			category: 'image'
		}
	};
}
