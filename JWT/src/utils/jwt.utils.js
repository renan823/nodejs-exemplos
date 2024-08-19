const jwt = require('jsonwebtoken');

exports.verify = async (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth) {
        res.status(401).json({ message: 'No token provided!', auth: false });
        return;
    }

    const token = auth.split(' ')[1];

    try {
        await jwt.verify(token, process.env.SECRET);
        next();
    } catch(err) {
        res.status(401).json({ message: 'Invalid token!', auth: false });
    }
}

exports.sign = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });
    return token;
}