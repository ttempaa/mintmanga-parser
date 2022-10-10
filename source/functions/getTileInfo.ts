import { baseUrl } from '#root/constants.js';
import { TileInfo } from '#root/types/tileInfo.js';
import nodefetch from 'node-fetch';
import { parse as parseHtml } from 'node-html-parser';

export async function getTileInfo(
	key: string,
	volume: number,
	chapter: number
): Promise<TileInfo> {
	let requestUrl: string = baseUrl + `${key}/vol${volume}/${chapter}`;
	let response = await nodefetch(requestUrl);
	let rawHtml = await response.text();
	let rootElement = parseHtml(rawHtml);
	let contentElement = rootElement?.querySelector('.leftContent');
	let namesElement = rootElement?.querySelector('.names');
	let metaElement = rootElement?.querySelector('.subject-meta');
	let titleRussian = namesElement?.querySelector('.name')?.textContent;
	let titleEnglish = namesElement?.querySelector('.eng-name')?.textContent;
	let titleOriginal = namesElement?.querySelector('.original-name')?.textContent;
	let description = contentElement
		?.querySelector('meta[itemprop="description"]')
		?.getAttribute('content');
	let releaseYear = metaElement
		?.querySelector('.elem_year')
		?.querySelector('a')?.textContent;
	let coverImageUrls = contentElement
		?.querySelector('.subject-cover')
		?.querySelector('.picture-fotorama')
		?.querySelectorAll('img')
		.map((element) => element.getAttribute('data-full'));
	let genres = metaElement
		?.querySelectorAll('.elem_genre')
		.map((element) => element.querySelector('a')?.textContent);

	let tileInfo: TileInfo = {
		key,
		titleRussian,
		titleEnglish,
		titleOriginal,
		description,
		releaseYear,
		genres,
		coverImageUrls,
	};
	return tileInfo;
}