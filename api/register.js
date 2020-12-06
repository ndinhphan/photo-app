const bodyParser = require('body-parser');
const Router = require('express');
const { getDb } = require('./db_mysql');
const route = new Router();

route.use(bodyParser.json());

let db = getDb();

route.post('/', (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;
    //check username existed
    db.User.findOne({
        attributes: ['id'],
        where: { username }
    }).then(result => {
        if (result) {
            return res.json({
                success: false,
                message: 'This username has already been used.'
            });
        }
        //check email existed
        db.User.findOne({
            attributes: ['id'],
            where: { email }
        }).then(result => {
            if (result) {
                return res.json({
                    success: false,
                    message: 'This email has already been used.'
                });
            }
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
        });
    });

    
});

module.exports = { route };
