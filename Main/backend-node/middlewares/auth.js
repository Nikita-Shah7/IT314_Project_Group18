const jwt = require('jsonwebtoken');

// authentication of the token when loggedIn as Admin
const authenticateToken = (req, res, next) => {
    // console.log(req.headers)
    const authHeader = req.headers['authorization']
    // console.log(authHeader)
    if (authHeader) {
        const accessToken = authHeader.split(' ')[1]
        // console.log(accessToken)
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            // console.log("ERROR MESSAGE ::",err)
            if (err) {
                // meaning that you have accessToken but it is not valid(might be expired)
                return res.status(403).json({ message: "Invalid accessToken !!" })
            }
            else next()
        })
    }
    else return res.status(401).json({ message: "Unauthorized !!" })
}

module.exports = authenticateToken;