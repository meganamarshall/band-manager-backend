const db = require('./db');

db.dropCollection('tours')
  .then(() => console.log('database dropped'));
