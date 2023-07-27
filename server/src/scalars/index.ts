import { GraphQLScalarType, ValueNode } from 'graphql';
import { has } from 'lodash';
import { Note } from 'src/resolvers';
import { Notebook } from 'src/resolvers';
import { keyToId } from 'src/utils';

interface SavedObjs {
	notes: Note[];
	notebooks: Notebook[];
}

function validateSavedObjs(val: SavedObjs) {
	if (!has(val, 'notes') || !has(val, 'notebooks')) {
		throw new Error('Must have both arrays of notes and notebooks.');
	}
	return val;
}

export const SavedObjects = new GraphQLScalarType({
	name: 'SavedObjects',
	description: 'Saved note and notebooks',
	serialize: (val: SavedObjs): SavedObjs => {
		validateSavedObjs(val);
		val.notes = val.notes.map(x => keyToId(x));
		val.notebooks = val.notebooks.map(x => keyToId(x));
		return val;
	},
	parseValue: (val: SavedObjs) => validateSavedObjs(val)
});
