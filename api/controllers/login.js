const { getDb } = require('../db_mysql');
const bcrypt = require('bcryptjs');
const jwtToken = require('../jwtToken');


let db = getDb();

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let login = (req, res) => {
    console.log(req.body);
    const { emailOrUsername, password } = req.body;
    if (EMAIL_REGEX.test(emailOrUsername)) {
        //check email exists
        db.User.findOne({                                   
            attributes: ['id', 'password'],
            where: { email: emailOrUsername }
        })
            .then((result) => {
               verifyUser(result, password, res);
            });
    } else {
        //check username exists
        db.User.findOne({                       
            attributes: ['id', 'password'],
            where: { username: emailOrUsername }
        })
        .then((result) => {
            verifyUser(result, password, res);
        });
    }

};

async function verifyUser(user, inputPassword, res) {
    if (user) {
        if(bcrypt.compareSync(inputPassword, user.dataValues.password)) {
            const userData = {
                name: user.dataValues.username,
                email: user.dataValues.email
            };
            const token = await jwtToken.generateToken(userData);

            return res.json({
                success: true,
                message: "Login success!",
                token: token
            });
        } 
        return res.json({
            success: false,
            message: 'Incorrect Password.'
        });
    } else {
        return res.json({
            success: false,
            message: 'Email or Username doesn\'t exist.'
        });
    }
}
module.exports = { login };
