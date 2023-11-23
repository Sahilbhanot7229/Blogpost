module.exports =(req,res) =>{
   if (res.session.userId){
    return res.render('create')
}res.redirect('/path/login')
}
