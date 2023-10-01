const validarValor = (req,res,next)=>{
    const {valor} = req.body
    if (!valor || isNaN(valor) || Number(valor) <= 0){
        return res.status(400).json({mensagem:'Valor Invalido'})
    }
    next()
}
module.exports={validarValor}