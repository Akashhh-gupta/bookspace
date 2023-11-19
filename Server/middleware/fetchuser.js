const jwt = require('jsonwebtoken')
// const JWT_Secret = process.env.JWT_Secret
const JWT_Secret = "AllYouHadToDoWasFollowTheDamnTrainCJ"

const fetchuser = async (req, res, next) => {
    // Get the user from jwt token & add id to req object
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ errors: "Authenticate with valid Token" });
    }
    try {
        const data = jwt.verify(token, JWT_Secret);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500, "Some error occured");
    }
}

module.exports = fetchuser;