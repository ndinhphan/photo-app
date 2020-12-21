
let home = (req, res) => {
    console.log("home: ");
    console.log(req.body.token);
    res.json({
        authorized: true,
        message: 'Verified.'
    });
}

module.exports = { home }