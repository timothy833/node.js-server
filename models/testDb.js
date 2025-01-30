const pool = require('../db'); // 確保正確引用 db.js

const insertTestData = async () => {
    try {
        await pool.query('TRUNCATE TABLE cart RESTART IDENTITY;') // 清空表並重置自增ID
        console.log('Table cleared.');
        const insertQuery = `
            INSERT INTO cart (name, price, quantity)
            VALUES
                ('Item A', 100.00, 2),
                ('Item B', 200.00, 1),
                ('Item C', 500.00, 5)
        RETURNING *;
        `
        const result = await pool.query(insertQuery);
        console.log('Test data inserted:', result.rows);
    } catch (error) {
        console.error('Error insertong test data:', error.message);
    } finally {
        try {
            pool.end(); // 結束連線池
            console.log('Database connection closed successfully.');
        } catch (error) {
            console.error('Error closing the database connection:', endError.message);
        }
    }
}

insertTestData();

