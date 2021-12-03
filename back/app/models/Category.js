const db = require('../database');

class Category {
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
            const query = {
                text: `INSERT INTO category (name, user_id) VALUES ($1, $2) RETURNING *`,
                values: [this.name, this.userId]
            }
            const {rows: category } = await db.query(query);
            return new Category(category[0]);
    }

    async update() {
        const query = {
            text: `
                UPDATE category 
                SET name = $1,
                    updated_at = NOW() 
                WHERE id = $2 RETURNING *`,
            values: [this.name, this.id]
        }
        const {rows: category} = await db.query(query);
        return new Category(category[0]);
    }

    async delete() {
        const query = {
            text: 'DELETE FROM category WHERE id = $1',
            values: [this.id]
        };
        await db.query(query);
        return 'La catégorie a bien été supprimée.';
    }
}

module.exports = Category;