const db = require('../database');
const ErrorHandler = require('../error/ErrorHandler');

class Token {
    id;
    name;
    userId;
    createdAt;
    updatedAt;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    set user_id(value) {
        this.userId = value;
    }

    set created_at(value) {
        this.createdAt = value;
    }

    set updated_at(value) {
        this.updatedAt = value;
    }

    async save() {
            try {
                const selectQuery = {
                    text: 'SELECT * FROM token WHERE user_id = $1',
                    values: [this.userId]
                };
                const insertQuery = {
                    text: `INSERT INTO token (name, user_id) VALUES ($1, $2) RETURNING name`,
                    values: [this.name, this.userId]
                };
                // check if the token already exists
                const {rows: token} = await db.query(selectQuery);
                if(!token[0]) {
                    const {rows} = await db.query(insertQuery);
                    return new Token(rows[0]);
                }
                return new Token(token[0]);
            } catch (error) {
                if(error.constraint === 'token_user_id_unique') throw new ErrorHandler(500, 'Already connected.');
                throw error;
            }
    }

    async checkIfExists() {
        const query = {
            text: 'SELECT * FROM token WHERE user_id = $1',
            values: [this.userId]
        };
        const {rows: token} = await db.query(query);
        if(!token[0] || token[0].name !== this.name) throw new ErrorHandler(403, 'Token introuvable dans la base de données');
        return new Token(token[0]);
    }

    async delete() {
        const query = {
            text: 'DELETE FROM token WHERE user_id = $1',
            values: [this.userId]
        };
        await db.query(query);
        return 'Le token a bien été supprimé.';
    }
}

module.exports = Token;