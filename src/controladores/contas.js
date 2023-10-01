let {contas, numero} = require('../bancodedados')

const listarContas = (req, res)=>{
    return res.json(contas)
}

const criarContas = (req, res)=>{
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    const cpfExistente = buscarCpfExtistente(cpf)
    const emailExistente = buscarEmailExtistente(email)
    if(cpfExistente || emailExistente){
        res.status(400).json({mensagem: 'Já existe uma conta com o cpf ou e-mail informado!'})
    }
    
    const conta = {
        numero: numero++,
        saldo: 0,
        usuario:{
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email,
            senha: senha
        }
    }

    contas.push(conta)
    return res.status(201).json()
}
const buscarCpfExtistente = (cpf)=>{
    const cpfExistente = contas.find((conta)=>{
        return conta.usuario.cpf === cpf
    })
    return cpfExistente
}
const buscarEmailExtistente = (email)=>{
    const emailExistente = contas.find((conta)=>{
        return conta.usuario.email === email
    })
    return emailExistente
}
const atualizarUsuario = (req, res)=>{
    const {numeroConta} = req.params
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    const contaAtual = contas.find((conta)=>{
        return conta.numero === Number(numeroConta)
    })
    if(!contaAtual){
        return res.status(404).json({mensagem:'Conta nao encontrada'})
    }
    let novoUsuario = contaAtual.usuario

    if(cpf){
        const cpfExistente = buscarCpfExtistente(cpf)
        if(cpfExistente && cpfExistente.usuario.cpf != contaAtual.usuario.cpf){
            return res.status(400).json({mensagem: 'Já existe uma conta com o cpf informado!'})
        } else {novoUsuario.cpf = cpf}
    }
    if(email){
        const emailExistente = buscarEmailExtistente(email)
        if(emailExistente && emailExistente.usuario.email != contaAtual.usuario.email){
            return res.status(400).json({mensagem: 'Já existe uma conta com o e-mail informado!'})
        } else{ novoUsuario.email = email}
    }
    if(nome){
        novoUsuario.nome = nome
    }
    if(data_nascimento){
        novoUsuario.data_nascimento = data_nascimento
    }
    if(telefone){
        novoUsuario.telefone = telefone
    }
    if(senha){
        novoUsuario.senha = senha
    }
    contaAtual.usuario = novoUsuario
    return res.status(204).json()
}
const excluirConta = (req, res)=>{
    const {numeroConta} = req.params
    const contaAtual = contas.find((conta)=>{
        return conta.numero === Number(numeroConta)
    })
    if(!contaAtual){
        return res.status(404).json({mensagem:'Conta nao encontrada'})
    }

    contas = contas.filter((conta)=>{
        return conta.numeroConta !== Number(numeroConta)
    })
    return res.status(204).send()
}

module.exports = {listarContas, criarContas, atualizarUsuario, excluirConta}