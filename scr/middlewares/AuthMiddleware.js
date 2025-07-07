/*const jwt = require('jsonwebtoken');


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
*/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('Token recebido:', req.cookies.token, req.headers.authorization);
    // Primeiro tenta pegar do header Authorization
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    }

    // Se não veio no header, tenta pegar do cookie
    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(403).json({ mensagem: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ mensagem: error.message });
    }
};