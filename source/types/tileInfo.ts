import { TileKey } from './tileKey.js';

export type TileInfo = TileKey & {
	// Автор
	authors: (string | undefined)[] | undefined;

	// Русское название
	titleRussian: string | undefined;

	// Английское название
	titleEnglish: string | undefined;

	// Оригральное название
	titleOriginal: string | undefined;

	// Описание
	description: string | undefined;

	// Год выпуска
	releaseYears: (string | undefined)[] | undefined;

	// Ссылки на изображения обложек
	coverImageUrls: (string | undefined)[] | undefined;

	// Жанры
	genres: (string | undefined)[] | undefined;

	// Количество томов
	volumeCount: number | undefined;
};
