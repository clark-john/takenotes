import { set, unset } from 'lodash';

/**
 * A function to convert a object that has the key named "key" into "id"
 */
export function keyToId(obj: any) {
	const id = obj.key;
	unset(obj, 'key');
	set(obj, 'id', id);
	return obj;
}
