import { getTiles } from '../dist/index.js';

(async () => {
	let result = await getTiles(0, 'votes');
	console.log(result);
})();
