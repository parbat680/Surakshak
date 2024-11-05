var jwt = require('jsonwebtoken');
require("dotenv/config");

const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('token');
    if (!token) {
        res.status(401).send({ success: false, error: "Please authenticate using a valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, process.env.Token_id);
            req.user = data.result;
            console.log("User found", data.result)
            next();
        } catch (error) {
            res.status(401).send({ success: false, error: "Please authenticate using a Valid token" })
        }
    }
}


module.exports = fetchuser;