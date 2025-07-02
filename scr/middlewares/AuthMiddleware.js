const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(403).json({ mensagem: 'Token não fornecido.' });

    try {
        const [, token] = authHeader.split(' ');
        
        console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ mensagem: error.message });
    }
}