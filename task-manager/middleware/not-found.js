const notFound = (req, res, next) => {
    res.status(404).send('Route dooes not exist');
}

module.exports = notFound;