/**
 * This function used to handle eatra layer authentication
 * @author Didijobs <rgy713>
 */
function authenticationMiddleware() {
    return function (req, res, next) {
        console.log("req.isAuthenticated()",req.isAuthenticated())
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/')
    }
}

module.exports = authenticationMiddleware
