const { handleErrorResponse } = require("../utils/responseHandlers")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const checkAdminAuth = (req, res, next) => {
    const header = req.get('Authorization')

    if(!header || !header.startsWith('Bearer')){
        handleErrorResponse(res, { statusCode: 403, message: "No token found, authorization denied."})
    }

    try{
        const token = header.split(' ')[1]
        const user  = jwt.verify(token, JWT_SECRET)

        console.log(user)

        if (!user || user.username!="admin"){
            return handleErrorResponse(res, { statusCode: 401, message: "You are not authorized."})
        }
        req.user = user
        next()
    }
    catch(err){
        handleErrorResponse(res,err)
    }
}

module.exports = { checkAdminAuth }