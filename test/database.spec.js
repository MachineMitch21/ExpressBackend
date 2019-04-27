import assert from 'assert';
import Database from '../src/database';

const url = 'mongodb://localhost:27017/test_db';

it('database wait connect', () => {
	let db = new Database(url, {
		waitConnect: true
	});

	assert(true, db.con === null);
});

it('database connect on initialization', () => {
	let db = new Database(url, {
		waitConnect: false
	});

	assert(true, db.hasValidConnection());
});

it('database connectionCallback returns Database object', () => {
	let db = new Database(url, {}, (dbObj) => {
		assert(true, db === dbObj);
	});
});