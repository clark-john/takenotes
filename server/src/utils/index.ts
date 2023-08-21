import { BaseModel } from 'detantic';
import { keys, unset } from 'lodash';

export function removeEmpty(obj: Record<string, any>) {
	keys(obj).forEach(x => {
		if (!obj[x]) {
			unset(obj, x);
		}
	});
	return obj;
}

export function deserializeDate<T extends BaseModel & { createdAt: string | Date }>(obj: T){
	obj.createdAt = new Date(obj.createdAt);
	return obj;
}
