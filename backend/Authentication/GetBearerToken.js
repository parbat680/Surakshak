const { sign, verify } = require("jsonwebtoken");
require("dotenv/config");

async function tokenGenerate(newUser, req, res) {
    try {
        return sign({ result: newUser }, process.env.Token_id, {
            expiresIn: 60 * 60 * 24 * 30
        });
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
}
module.exports = { tokenGenerate }