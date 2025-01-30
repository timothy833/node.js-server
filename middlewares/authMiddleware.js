const jwt = require('jsonwebtoken');
require ('dotenv').config(); //加載.env 文件中環境變數

//Token生成函數
const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET; //優先使用環境變數
    if(!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");    
    }
    
    const token = jwt.sign(payload, secret, {expiresIn: '1h' }); // 設置過期時間
    return token;
}

//Token 驗證中間件
const authMiddleware = (req, res, next) =>{
    const token = req.headers['authorization']?.split(' ')[1]; //獲取Bear Token
    if(!token) {
        return res.status(403).json({ error: 'No token provided'});
    }

    try{
        const secret = process.env.JWT_SECRET; //獲取密鑰
        const decoded = jwt.verify(token, secret); //驗證token
        req.user = decoded; //將解碼後的用戶信息附加到請求對象
        next(); 
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token'});
    }
};


// 示例生成
const payload = {id: 123}; //假設用戶ID
const token = generateToken(payload);
console.log('Generated token', token);


module.exports = { generateToken, authMiddleware };