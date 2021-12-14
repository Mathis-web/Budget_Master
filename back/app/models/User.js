const db = require('../database');
const { hashPassword, comparePassword } = require('../services/passwordHandler');
const ErrorHandler = require('../error/ErrorHandler');

class User {
    id;
    email;
    password;
    createdAt;
    updatedAt;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    set created_at(value) {
        this.createdAt = value;
    }

    set updated_at(value) {
        this.updatedAt = value;
    }

    async save() {
        try {
            this.password = await hashPassword(this.password);
            const insertUserQuery = {
                text: `INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id`,
                values: [this.email, this.password]
            }
            const {rows: user} = await db.query(insertUserQuery);
            // attached some data to the user so his dashboard wont be empty on his first connexion
            const {rows: vetements} = await db.query(`INSERT INTO category (name, user_id) VALUES ('vêtements', ${user[0].id}) RETURNING id`);
            const {rows: nourriture} = await db.query(`INSERT INTO category (name, user_id) VALUES ('nourriture', ${user[0].id}) RETURNING id`);

            await db.query(`
                INSERT INTO expense (description, price, category_id) VALUES 
                    ('t-shirt nike', 20, ${vetements[0].id}),
                    ('achat de 2 jeans', 28, ${vetements[0].id});
                INSERT INTO expense (description, price, category_id) VALUES
                    ('apero soirée entre amis', 16, ${nourriture[0].id}),
                    ('fruits et légumes carrefour', 12, ${nourriture[0].id});
            `);
        } catch (error) {
            if(error.constraint === 'email_check') {
                throw new ErrorHandler(500, 'Format d\'email non valide.');
            }
            if(error.constraint === 'user_email_unique'){
                throw new ErrorHandler(500, 'Un compte avec cet email existe déjà.');
            }
            throw new ErrorHandler(500, 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.')
        }
    };

    async checkIfExists() {
        // search user with his email, if found then check if his password match his hashed pasword
        const query = {
            text: `SELECT * FROM "user" WHERE email = $1`,
            values: [this.email]
        }
        const { rows: user } = await db.query(query);

        if(user[0]) {
            const isCorrectPassword = await comparePassword(this.password, user[0].password);
            if(isCorrectPassword) return new User(user[0])
        }

        throw new ErrorHandler(500, 'Mauvais email ou mot de passe.');
    };
}

module.exports = User;