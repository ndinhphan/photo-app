const { getDb } = require('../db_mysql');


let db = getDb();
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let register = (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;

    if (!EMAIL_REGEX.test(email)) 
        return res.json({
            success: false,
            message: 'Invalid Email.'
        });
        
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
};

module.exports = { register };
