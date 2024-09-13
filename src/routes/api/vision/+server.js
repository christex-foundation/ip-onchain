//@ts-check
import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$lib/server/config';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const { images } = await request.json();

	const messages = getMessage(images);
	const response = await fetchAIResponse(messages);

	console.log('OPEN AI:', response.choices[0].message.content);
	const parsedResponse = parseAIResponse(response);

	if (parsedResponse.error) {
		return json({ success: false, error: parsedResponse.error });
	}

	if (parsedResponse.confidenceLevel < 90) {
		return json({ success: false, error: 'Confidence level is too low' });
	}

	return json({ success: true, ...parsedResponse });
}

/**
 * @param {any} response
 */
function parseAIResponse(response) {
	const rawJson = response.choices[0].message.content.trim().replace(/^```json\n|\n```$/g, '');
	const parsedResponse = JSON.parse(rawJson);

	// Convert to camelCase
	return Object.fromEntries(
		Object.entries(parsedResponse).map(([key, value]) => [
			key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
			value
		])
	);
}

/**
 * @param {string[]} images
 */
function getMessage(images) {
	return [
		{
			role: 'user',
			content: [
				{
					type: 'text',
					text: `I am registering this image for a trademark. I want to ensure that these images represent the same logo. there could be some variations in color, in presentation as some maybe the logo only or the logo with a name.

i want you to extract the following and return to me in json format, using the following keys:
- confidenceLevel: how certain are you that all these images are of the same logo, rated from 1 - 100.
- dominantColours: extract the main dominant colours  in HEX in a flattened array, that exist in the logo. with PNGs ignore the background if its transparent. 
- attributes:return to me an array if you detect any of the following: the logo is 3d, there are multiple logo variations
- otherLanguages: an array of objects of words that appear in the image that are not in english and the language.
- words: extract all the words that appear in the image in a flattened array

your response should be the json object only, no other text or characters.

If you detect any of the following, return an error:
- the logo is not the same
- the image or images are not a logo
`
				},
				...images.map((base64Image) => ({
					type: 'image_url',
					image_url: {
						url: `data:image/jpeg;base64,${base64Image}`
					}
				}))
			]
		}
	];
}

/**
 * @param {any} messages
 */
async function fetchAIResponse(messages) {
	return await openai.chat.completions.create({
		model: 'gpt-4o',
		messages
	});
}
