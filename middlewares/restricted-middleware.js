module.exports = (req,res,next) => {
    console.log('req.session', req.session,'req.session.user', req.session.user )
    if (req.session && req.session.user){
        if (req.session.user.admin){
            next();
        } else {
            res.status(400).json({message: 'You are not an admin'})
        }
    } else {
        res.status(401).json({message: 'You shall not pass!'})
    }

}