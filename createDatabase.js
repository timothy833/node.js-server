const { Pool } = require('pg');
const { database, password, port } = require('pg/lib/defaults');
require('dotenv').config(); //加載環境變數

// 連接到PostgreSQL 預設的管理資料庫 `postgres`
const pool = new Pool({
    user: 'liaoqianshun', //超級使用者
    host: process.env.DB_HOST,
    database: 'postgres', // 超級用戶
    // password: process.env.DB_PASSWORD, //'你的超級用戶密碼',
    port: process.env.DB_PORT
});

const createDatabase = async ()=>{
    try {
        //檢查創建資料庫
        const databasName = process.env.DB_NAME;
        const query = `CREATE DATABASE ${databasName}`;

        console.log(`Checking or creating database: ${databasName}`);
        await pool.query(query);
        console.log*(`Database "${databasName}" created successfully`);
    } catch (error) {
        if( error.code === '42P04' ) {
            console.log('Database already exists.');
        } else {
            console.error('Error creating database:', error.message);
        }
    } finally {
        pool.end(); //關閉連接
    }
}

createDatabase();