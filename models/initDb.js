const pool = require('../db');

//初始化資料表
const initalizeDatabase = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS cart (
                id SERIAL PRIMARY KEY, -- 自增主鍵
                name VARCHAR(100) NOT NULL, -- 商品名稱，最長100字符
                price  NUMERIC(10, 2) NOT NULL, -- 價格，高精度浮點數
                quantity INTEGER NOT NULL -- 數量，整數
            );
        `;
        await pool.query(createTableQuery);
        console.log('Table "cart" created or already exists.');
    } catch (error) {
        console.error('Error creating table:', error.message);
    } finally {
        pool.end(); // 結束連線池，避免程序無法退出
    }
};

// initalizeDatabase();

module.exports = initalizeDatabase; //導出函數