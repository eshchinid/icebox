const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:1q2w3e4R@localhost:5432/icebox');

module.exports = db;