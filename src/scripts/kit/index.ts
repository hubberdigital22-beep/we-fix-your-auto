import { whenIdle } from '../idle';

whenIdle(() => {
	import('./motion').then(({ start }) => start());
});
