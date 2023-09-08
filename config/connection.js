const { connect, connection } = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/social_db';
connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = connection;
