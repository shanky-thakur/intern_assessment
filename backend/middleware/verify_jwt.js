// environment variables set up
const secret = process.env.JWT_SECRET;

// import jwt packages
const jwt = require("jsonwebtoken");

// middleware function
const middleware_service = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // check the header
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // decode token
        const decoded = jwt.verify(token, secret);

        // assign user access
        req.user = decoded;

        // pass the lifecycle of the request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

// export the middleware service
module.exports = middleware_service;