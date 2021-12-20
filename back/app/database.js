const { Pool } = require('pg');
// se base sur les variables d'environnement (.env) pour se connecter à la base de données
let pool;

if(process.env.NODE_ENV === 'development') {
    pool = new Pool();
}
else {
    // config for the production database
    const connectionString = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    };
    pool = new Pool(connectionString);
}

module.exports = pool;