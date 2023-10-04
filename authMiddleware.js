const jwt = require('jsonwebtoken');
require('dotenv').config();
function authMiddleware (req, res, next){
    //Get the token from the request header
    
    const token = req.header('Authorization');

    //check if token is missing
    if (!token){
        return res.status(401).json({error: 'Authentication failed: No token provided'});

    }
    try {
        //verify the token using jwt secret
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
        req.user = decoded;
        //continue to the next route
        next();
    }catch (err){
        res.status(401).json({error: 'Authentication failed: Invalid token '})
    }
}