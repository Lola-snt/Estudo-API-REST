
const validarNumeroConta =(numero_conta)=>{
    if (!numero_conta || isNaN(numero_conta)){
        return 'O numero da conta esta invalido'
    }
    return ""
}
const validarNumeroContaQuery=(req,res,next)=>{
    const {numero_conta} = req.query
    let mensagem = validarNumeroConta(numero_conta)
    if(mensagem != ""){
        return res.status(400).json({mensagem})
    }
    next()
}
const validarNumeroContaPath=(req,res,next)=>{
    const {numero_conta} = req.params
    let mensagem = validarNumeroConta(numero_conta)
    if(mensagem != ""){
        return res.status(400).json({mensagem})
    }
    next()
}
const validarNumeroContaBody=(req,res,next)=>{
    const {numero_conta} = req.body
    let mensagem = validarNumeroConta(numero_conta)
    if(mensagem != ""){
        return res.status(400).json({mensagem})
    }
    next()
}
module.exports={validarNumeroContaQuery,validarNumeroContaPath,validarNumeroContaBody}