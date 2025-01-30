const express =require('express');
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');
const dotenv = require('dotenv'); // 加載環境變數
const initalizeDatabase = require('./models/initDb');

// 加載環境變數
dotenv.config();
console.log('Envirment Varibles', process.env);

const app = express();

//中間件
app.use(cors({
    origin: 'htpp://localhost: 3000',  // 允許的前端網址
    credentials: true // 如果需要傳遞 Cookie 或身份信息
}));
app.use(bodyParser.json());



// 日誌中間件
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

//路由
app.use('/api', cartRoutes);

//測試路由
app.get('/', (req, res) =>{
    res.send('Express.js Server is running.');
});

//啟動伺服器並初始化資料庫
const PORT = process.env.PORT || 5000; // 優先從環境變數讀取端口
app.listen(PORT, async ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);

    // 初始化資料表
    await initalizeDatabase();
});