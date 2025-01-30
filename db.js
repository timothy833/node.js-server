const { Pool } = require('pg');
require ('dotenv').config(); // 加載環境變數

const pool = new Pool({
    user: process.env.DB_USER, // 資料庫用戶名
    host: process.env.DB_HOST, // 主機
    database: process.env.DB_NAME, // 資料庫名稱
    password: process.env.DB_PASSWORD, // 資料庫密碼
    port: process.env.DB_PORT // PostgreSQL 預設端口
});

module.exports = pool;