import { getTileInfo } from '../dist/index.js';

(async () => {
	let result = await getTileInfo('devochka__kotoraia_vidit_eto__A5327');
	console.log(result);
})();
