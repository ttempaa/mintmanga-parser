import { baseUrl } from '#root/constants.js';
import { TileImageUrls } from '#root/types/tileImageUrl.js';
import { parse as parseHtml } from 'node-html-parser';
import nodefetch from 'node-fetch';

export async function getTileImageUrls(
	key: string,
	volume: number,
	chapter: number
): Promise<TileImageUrls> {
	let responseUrl: string = baseUrl + `${key}/vol${volume}/${chapter}`;
	let response = await nodefetch(responseUrl);
	let rawHtml = await response.text();
	let rootElement = parseHtml(rawHtml);
	let scriptElement = rootElement
		?.querySelectorAll('.reader-controller.pageBlock')[1]
		?.querySelectorAll('script')[2];
	if (!scriptElement) throw new Error(`Wrong page`);
	let scriptRawCode = scriptElement?.childNodes[0]?.rawText;
	if (!scriptRawCode) throw new Error(`Wrong raw code`);
	let startIndex = scriptRawCode.indexOf('[[');
	let endIndex = scriptRawCode.indexOf(']]') + 2;
	let stringArray = scriptRawCode.substring(startIndex, endIndex).replaceAll("'", '"');
	let parsedArray = JSON.parse(stringArray);
	let urls = parsedArray.map((element: string[]) => element[0] + element[2]);
	return {
		key,
		volume,
		chapter,
		urls,
	};
}
