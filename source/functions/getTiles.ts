import { baseUrl } from '#root/constants.js';
import { TileKey } from '#root/types/tileKey';
import { ListSortType } from '#root/types/listSortType.js';
import { parse as parseHtml } from 'node-html-parser';
import nodefetch from 'node-fetch';

export async function getTiles(
	page: number = 0,
	sortType: ListSortType = 'votes'
): Promise<TileKey[] | null> {
	let itemsInPage = 70;
	let offset: number = page * itemsInPage;
	let requestUrl: string = baseUrl + `list?sortType=${sortType}&offset=${offset}`;
	let response = await nodefetch(requestUrl);
	let rawHtml = await response.text();

	let rootElement = parseHtml(rawHtml as string);
	if (!rootElement) return null;
	let tileElements = rootElement.querySelectorAll('.tile');
	if (!tileElements) return null;

	let tileKeys: TileKey[] = [];
	for (let tile of tileElements) {
		let tileLinkElement = tile.querySelector('.img')?.querySelector('a');
		let tileLinkHref = tileLinkElement?.getAttribute('href');
		let tileKey = tileLinkHref?.substring(1);
		if (!tileKey) {
			console.error(`Tile key not finded on page ${page}`);
			continue;
		}
		tileKeys.push({ key: tileKey });
	}
	return tileKeys;
}
