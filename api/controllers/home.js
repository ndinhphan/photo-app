
let home = (req, res) => {
    // console.log(req.body.token.data.id);
    // console.log(req.body.token.id);
    res.json({
        authorized: true,
        message: 'Verified.',
        userId: req.body.token.id
    });
}

module.exports = { home }