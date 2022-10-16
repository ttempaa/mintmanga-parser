import { baseUrl } from '#root/constants.js';
import { TileInfo } from '#root/types/tileInfo.js';
import nodefetch from 'node-fetch';
import { parse as parseHtml } from 'node-html-parser';

export async function getTileInfo(key: string): Promise<TileInfo> {
	let requestUrl: string = baseUrl + key;
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
	let authors = contentElement
		?.querySelectorAll('.elem_author')
		?.map((element) => element.querySelector('a')?.textContent);
	let releaseYears = metaElement
		?.querySelectorAll('.elem_year')
		?.map((element) => element.querySelector('a')?.textContent);
	let coverImageUrls = contentElement
		?.querySelector('.subject-cover')
		?.querySelector('.picture-fotorama')
		?.querySelectorAll('img')
		.map((element) => element.getAttribute('data-full'));
	let genres = metaElement
		?.querySelectorAll('.elem_genre')
		.map((element) => element.querySelector('a')?.textContent);
	let chaptersElement = contentElement
		?.querySelector('#chapters-list')
		?.querySelectorAll('.item-title');

	let chapters = chaptersElement?.map((element) => {
		let volume = element.getAttribute('data-vol');
		let chapter = element.getAttribute('data-num');
		if (chapter?.endsWith('0') && chapter !== '0') chapter = chapter.replace(/0$/, '');
		else if (chapter?.endsWith('5')) chapter = chapter.replace(/5$/, '.5');
		return { volume, chapter };
	});

	let tileInfo: TileInfo = {
		key,
		authors,
		titleRussian,
		titleEnglish,
		titleOriginal,
		description,
		releaseYears,
		genres,
		coverImageUrls,
		chapters,
	};
	return tileInfo;
}
