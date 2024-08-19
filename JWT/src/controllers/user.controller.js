const jwt = require('../utils/jwt.utils');

exports.login = (req, res) => {
    let data = req.body;
    let email = data.email;
    let password = data.password;

    if(email === 'jose@email.com' && password === '1234') {
        let token = jwt.sign({email: email});
        res.status(200).json({ message: 'Welcome!', token: token, auth: true });
    } else {
        res.status(401).json({ message: 'Invalid credentials', auth: false });
    }
}

exports.all = (req, res) => {
    res.status(200).json({ message: 'Success' });
}

exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout!', auth: false, token: null });
}