module.exports = (err, req, res, nxt) => {
    for (const e in err.errors) {
        console.log(e.message);
        res.status(500).json({ succes: false, error: 'Internal Servar Error !!' });
    }
}