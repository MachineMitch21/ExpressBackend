import Database from './database';

let db = new Database('mongodb://localhost:27017/test_db', { 
	waitConnect: true
});