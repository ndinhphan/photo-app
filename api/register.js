const bodyParser = require('body-parser');
const Router = require('express');
const { getDb } = require('./db_mysql');
const route = new Router();

route.use(bodyParser.json());

let db = getDb();

route.post('/', (req, res) => {
    const { fisrtname, lastname, email, password } = req.body;
    console.log(req.body);
    const newUser = db.User.create({
        username: null,
        fisrtname: JSON.stringify(fisrtname),
        lastname: JSON.stringify(lastname),
        email: JSON.stringify(email),
        password: JSON.stringify(password)
    });
                res.json({
                    success: true,
                    data: newUser.id});
        //         });
        //     } else res.json({success: false})
        // })
});

module.exports = { route };
