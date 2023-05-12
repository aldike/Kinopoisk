const isAdmin = (req, res, next) =>{
    if(req.user.isAdmin){
        next();
    }else{
        res.status(401).send('Unauthorized')
    }
}

const isAuth = (req, res, next) =>{
    if(req.user){
        next();
    }else{
        res.status(401).send('Unauthorized')
    }
}
module.exports = {
    isAuth,
    isAdmin
}