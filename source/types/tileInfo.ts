import { TileKey } from './tileKey.js';

export type TileInfo = TileKey & {
	// Русское название
	titleRussian: string | undefined;

	// Английское название
	titleEnglish: string | undefined;

	// Оригральное название
	titleOriginal: string | undefined;

	// Описание
	description: string | undefined;

	// Год выпуска
	releaseYear: string | undefined;

	// Ссылки на изображения обложек
	coverImageUrls: (string | undefined)[] | undefined;

	// Жанры
	genres: (string | undefined)[] | undefined;
};
