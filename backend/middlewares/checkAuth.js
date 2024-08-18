const { handleErrorResponse } = require("../utils/responseHandlers")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const checkAuth = (req, res, next) => {
    const header = req.get('Authorization')

    if(!header || !header.startsWith('Bearer')){
        handleErrorResponse(res, { statusCode: 403, message: "No token found, authorization denied."})
    }

    try{
        const token = header.split(' ')[1]
        const user  = jwt.verify(token, JWT_SECRET)

        if (!user){
            console.log("inside here")
            handleErrorResponse(res, { statusCode: 401, message: "You are not authorized."})
        }
        req.user = user
        console.log("req.user:",req.user)
        next()
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

module.exports = { checkAuth }