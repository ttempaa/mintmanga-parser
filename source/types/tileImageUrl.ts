import { TileKey } from './tileKey.js';

export type TileImageUrls = TileKey & {
	volume: number;
	chapter: number;
	urls: string[] | undefined;
};
