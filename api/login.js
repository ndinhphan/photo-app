const bodyParser = require('body-parser');
const Router = require('express');
const { getDb } = require('./db_mysql');
const route = new Router();
const bcrypt = require('bcryptjs');


route.use(bodyParser.json());

let db = getDb();

route.post('/', (req, res) => {
    const { email, password } = req.body;
    res.redirect('/home');
    db.User.findOne({
        attributes: ['id', 'password'],
        where: { email }
    })
        .then((result) => {
            if (result) {
                console.log(bcrypt.compareSync(password, result.dataValues.password));
                if(bcrypt.compareSync(password, result.dataValues.password)) {
                    res.json({ // TODO: send back an auth-token
                        status: true,
                        data: 'auth_token'
                    });
                }
            } else res.json({success: false})
        })
});

module.exports = { route };
