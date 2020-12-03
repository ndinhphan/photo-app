const bodyParser = require('body-parser');
const Router = require('express');
const { getDb } = require('./db_mysql');
const route = new Router();

route.use(bodyParser.json());

let db = getDb();

route.post('/', (req, res) => {
    const { email, password } = req.body;
    db.User.findOne({
        attributes: ['id', 'firstname', 'lastname'],
        where: { email, password }
    })
        .then((response) => {
            if (response) {
                // res.json({
                //     success: true,
                //     id: response.User.dataValues.id,
                // });
                res.json({
                    success: true,
                    data: response,
                });
            } else res.json({success: false})
        })
});

module.exports = { route };
