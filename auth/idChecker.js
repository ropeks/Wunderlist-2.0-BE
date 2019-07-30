function idChecker(req, res, next) {
    const userID = req.get('UserID');
    if (userID) {
        res.locals.id = userID;
        next();
    } else {
        return res.status(401).json({ message: 'Please provide userID on the UserID Header.' });
    }
}

module.exports = idChecker;