const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth = (req, res, next) => {

    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, process.env.SECRET_KEY);
            //we have added the user id to this req object, hence it will be avaiable to the next's req
            req.userId = user.id;


        }else{
            return res.status(401).json({message: "Unauthorized user"})
        }

        next();

    } catch (error) {
        console.log(error);
    }
}

module.exports = {auth};