const senhaAdmin = ((req,res,next) =>{
    let senha = req.query['senha_banco']
    if(senha === "Cubos123Bank"){
        next()
    }else{
        res.status(401).json({mensagem:'Senha incorreta'})
    }
})
module.exports = senhaAdmin