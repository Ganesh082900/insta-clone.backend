// Middleware that will authorise the user for CURD operations.

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        // Takes the token from the authorization header .
        const token = req.headers.authorization.split(" ")[1]
        // Send the userId 
        
        const verifiedId = jwt.verify(token, "Ganesh-Instagram")
        req.userId = verifiedId.id
        next();
    } catch {
        res.status(401).json({
            message: "Authentication failed"
        })
    }
}