const validarCamposUsuario = (req,res,next)=>{
    
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    if (!nome || nome === ""){
        return res.status(400).json({mensagem: 'Campo nome deverá ser preenchido'})
    }
    if (!cpf || cpf === ""){
        return res.status(400).json({mensagem: 'Campo cpf deverá ser preenchido'})
    }
    if (!data_nascimento || data_nascimento === ""){
        return res.status(400).json({mensagem: 'Campo data de nascimento deverá ser preenchido'})
    }
    if (!telefone || telefone === ""){
        return res.status(400).json({mensagem: 'Campo telefone deverá ser preenchido'})
    }
    if (!email || email === ""){
        return res.status(400).json({mensagem: 'Campo email deverá ser preenchido'})
    }
    if (!senha || senha === ""){
        return res.status(400).json({mensagem: 'Campo senha deverá ser preenchido'})
    }
    next()
}
module.exports = {validarCamposUsuario}