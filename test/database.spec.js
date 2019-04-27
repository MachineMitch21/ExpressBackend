import assert from 'assert';
import Database from '../src/database';

it('database wait connect', () => {
	let db = new Database('mongodb://localhost:27017/test_db', {
		waitConnect: true
	});

	assert(true, db.con === null);
});