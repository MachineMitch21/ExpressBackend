import { MongoClient } from 'mongodb';

const Database = function(url, options, connectionCb) {
	this.con = null;
	this.url = url;

	let _options = Object.assign(
		{
			waitConnect: false,
			persistConnection: true
		},
		options
	);

	// if persistConnection is false, waitConnect is ignored
	if (_options.persistConnection === true) {
		if (_options.waitConnect !== undefined && _options.waitConnect === false) {
			this.connect({}, connectionCb);
		}
	}
};

Database.prototype.connect = function(options, connectionCb) {
	let _options = Object.assign(
		{
			overrideConnection: false
		},
		options
	);

	if (this.con === null || (this.con !== null && _options.overrideConnection === true)) {
		MongoClient.connect(
			this.url,
			{
				useNewUrlParser: true
			},
			(err, db) => {
				if (err) {
					console.error(err.message);

					if (typeof connectionCb === 'function') connectionCb(err, null);

					throw err;
				}

				_this.con = db;

				if (typeof connectionCb === 'function') connectionCb(null, this);
			}
		);
	}
	let _this = this;
};

Database.prototype.disconnect = function(disconnectCb) {
	if (this.con !== undefined && this.con instanceof MongoClient) {
		this.con.close();
		this.con = null;
	}

	if (typeof disconnectCb === 'function') disconnectCb(this);
};

Database.prototype.hasValidConnection = function() {
	return this.con instanceof MongoClient;
}

export default Database;
