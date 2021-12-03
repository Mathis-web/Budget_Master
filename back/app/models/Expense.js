const db = require('../database');

class Expense {
    id;
    description;
    price;
    categoryId;
    createdAt;
    updatedAt;

    set category_id(value) {
        this.categoryId = value;
    }

    set created_at(value) {
        this.createdAt = value;
    }

    set updated_at(value) {
        this.updatedAt = value;
    }

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    async save() {
            const query = {
                text: `INSERT INTO expense (description, price, category_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`,
                values: [this.description, this.price, this.categoryId]
            }
            const {rows: expense } = await db.query(query);
            return new Expense(expense[0]);
    }

    async update() {
        const query = {
            text: `
                UPDATE expense 
                SET description = $1,
                    price = $2,
                    category_id = $3,
                    updated_at = NOW() 
                WHERE id = $4 RETURNING *`,
            values: [this.description, this.price, this.categoryId, this.id]
        }
        const {rows: expense} = await db.query(query);
        return new Expense(expense[0]);
    }

    async delete() {
            const query = {
                text: 'DELETE FROM expense WHERE id = $1',
                values: [this.id]
            };
            await db.query(query);
            return 'La dépense a bien été supprimée.';
    }
}

module.exports = Expense;