const bodyParser = require('body-parser');
const Router = require('express');
const { getDb } = require('./db_mysql');
const route = new Router();
const bcrypt = require('bcryptjs');


route.use(bodyParser.json());

let db = getDb();

route.post('/', (req, res) => {
    const { emailOrUsername, password } = req.body;
    //check email
    db.User.findOne({                                   
        attributes: ['id', 'password'],
        where: { email: emailOrUsername }
    })
        .then((result) => {
            if (result) {
                if(bcrypt.compareSync(password, result.dataValues.password)) {
                    return res.json({ // TODO: send back an auth-token
                        success: true,
                        data: 'auth_token'
                    });
                } 
                return res.json({
                    success: false,
                    message: 'Incorrect Password.'
                })
            } else {
                //check username
                db.User.findOne({                       
                    attributes: ['id', 'password'],
                    where: { username: emailOrUsername }
                })
                .then((result) => {
                    if (result) {
                        if(bcrypt.compareSync(password, result.dataValues.password)) {
                            return res.json({ // TODO: send back an auth-token
                                success: true,
                                data: 'auth_token'
                            });
                        }
                        return res.json({
                            success: false,
                            message: 'Incorrect Password.'
                        })
                    } else res.json({
                        success: false,
                        message: 'Email or Username doesn\'t exist.'
                    })
                })
            }
        })
});

module.exports = { route };
