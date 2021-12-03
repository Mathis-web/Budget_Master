const { Pool } = require('pg');
// se base sur les variables d'environnement (.env) pour se connecter à la base de données
const pool = new Pool();

module.exports = pool;