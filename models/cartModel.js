const pool = require('../db');
class CartModel {
    static async getAllItems() {
        const result = await pool.query('SELECT * FROM cart');
        return result.rows;
    }

    static async addItem (item) {
        const result = await pool.query(
            'INSERT INTO cart (name, price, quantity) VALUES ($1, $2, $3) RETURNING *',
            [item.name, item.price, item.quantity]
        );
        return result.row[0];
    }

    static async updateItem(id, item) {
        const result = await pool.query(
            'UPDATE cart SET name=$1, price=$2, quantity=$3, WHERE id=$4 RETURNING *',
            [item.name, item.price, item.quantity, id]
        );
        return result.rows[0];
    }

    static async deleteItem(id) {
        await pool.query('DELETE FROM cart WHERE id=$1', [id]);
    }
}

module.exports = CartModel;
