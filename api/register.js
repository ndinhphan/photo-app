const bodyParser = require('body-parser');
const Router = require('express');
const { getDb } = require('./db_mysql');
const route = new Router();

route.use(bodyParser.json());

let db = getDb();

route.post('/', (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;
    db.User.findOne({
        attributes: ['id'],
        where: { email }
    }).then(result => {
        if (result) {
            return res.json({
                success: false,
                message: 'This email has already been used. Please try another email.'
            });
        }
        else {
            const newUser = db.User.create({ 
                username,
                firstname, 
                lastname, 
                email, 
                password 
            }).then(result => {
                res.json({
                    success: true,
                    data: 'Register success'
                })
            })
        }
    })
});

module.exports = { route };
