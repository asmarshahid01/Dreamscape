const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn=(req,res,next)=>{
    console.log("HERE");
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        // req.flash("error","You Must be Logged In");
        // return new ExpressError(401,"You Must be Logged in");
        // return res.status(401).json({ message: "You Must be Logged In" });
        throw new ExpressError(401,"You must be Logged in");
    }
    next();
};