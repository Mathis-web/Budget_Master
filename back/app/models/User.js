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
            const query = {
                text: `INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id`,
                values: [this.email, this.password]
            }
            await db.query(query);
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