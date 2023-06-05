const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors/index")

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("No token provided");
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        req.user = decoded;
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route");
    }
    next();
}

module.exports = authenticationMiddleware;