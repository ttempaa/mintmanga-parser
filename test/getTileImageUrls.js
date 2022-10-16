import { getTileImageUrls } from '../dist/index.js';

(async () => {
	let result = await getTileImageUrls('devochka__kotoraia_vidit_eto__A5327', 0, 0);
	console.log(result);
})();
