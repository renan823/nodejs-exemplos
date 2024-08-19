const express = require('express');
const app = express();
const auth = require('./src/middleware/auth');
const cors = require('cors');

//env config
const env = require('dotenv');
env.config();

//express config
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//Using routes
app.use('/user', require('./src/routes/user.routes'));

//Protected route
app.get('/', auth, (req, res) => {
    console.log("You have a token!");
    res.json({message: 'hi'});
})

const PORT = process.env.PORT | 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})