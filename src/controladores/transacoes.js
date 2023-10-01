let  {contas, depositos, transferencias, saques} = require('../bancodedados')
const {format} = require('date-fns-tz')

const depositar  = (req,res)=>{
    const {numero_conta, valor} = req.body
    const contaAtual = contas.find((conta)=>{
        return conta.numero === Number(numero_conta)
    })
    if(!contaAtual){
        return res.status(404).json({mensagem:'Conta nao encontrada'})
    }
    let v = Number(valor)
    contaAtual.saldo += v
    const data = new Date()
    let deposito = 
    {
        data: format(data,"yyyy-MM-dd HH:mm:ss"),
        numero_conta:numero_conta,
        valor:v
    }
    depositos.push(deposito)
    return res.status(201).json()
}

const sacar = (req,res)=>{
    const {numero_conta, valor, senha} = req.body
    const contaAtual = contas.find((conta)=>{
        return conta.numero === Number(numero_conta)
    })
    if(!contaAtual){
        return res.status(404).json({mensagem:'Conta nao encontrada'})
    }
    
    if (senha === ""){
        return res.status(400).json({mensagem:'Senha deverá ser informada'})
    }
    if(senha != contaAtual.usuario.senha){
        return res.status(404).json({mensagem: 'Senha invalida'})
    }
    if (valor <= 0){
        return res.status(400).json({mensagem: 'O valor não pode ser menor que zero!'})
    }
    if (contaAtual.saldo < valor){
        return res.status(400).json({mensagem: 'Nao possui saldo para saque'})
    }
    let v = Number(valor)
    contaAtual.saldo -= v
    const data = new Date()
    let saque = 
    {
        data: format(data,"yyyy-MM-dd HH:mm:ss"),
        numero_conta:numero_conta,
        valor:v
    }
    saques.push(saque)
    return res.status(201).json()
}
const transferir = (req, res)=> {

    const {numero_conta_origem, numero_conta_destino, senha, valor} = req.body

    if (!numero_conta_origem || isNaN(numero_conta_origem)){
        return res.status(400).json({mensagem:'O numero da conta de origem esta invalido'})
    }
    if (!numero_conta_destino || isNaN(numero_conta_destino)){
        return res.status(400).json({mensagem:'O numero da conta de destino esta invalido'})
    }
    if (senha === ""){
        return res.status(400).json({mensagem:'Senha deverá ser informada'})
    }
    const contaOrigem = contas.find((conta)=>{
        return conta.numero === Number(numero_conta_origem)
    })
    if(!contaOrigem){
        return res.status(404).json({mensagem:'Conta de origem nao encontrada'})
    }
    const contaDestino = contas.find((conta)=>{
        return conta.numero === Number(numero_conta_destino)
    })
    if(!contaDestino){
        return res.status(404).json({mensagem:'Conta de destino nao encontrada'})
    }
    if(senha != contaOrigem.usuario.senha){
        return res.status(401).json({mensagem: 'Senha invalida'})
    }
    if (contaOrigem.saldo < valor){
        return res.status(404).json({mensagem: 'Saldo insuficiente!'})
    }

    let valorTransferencia = Number(valor)
    contaOrigem.saldo -= valorTransferencia
    contaDestino.saldo += valorTransferencia
    const data = new Date()
    let transferencia = 
    {
        data: format(data,"yyyy-MM-dd HH:mm:ss"),
        numero_conta_origem:numero_conta_origem,
        numero_conta_destino:numero_conta_destino,
        valor:valorTransferencia
    }
    transferencias.push(transferencia)
    return res.status(201).json()
}
const saldo = (req,res)=>{
    const {numero_conta, senha} = req.query
    
    const contaAtual = contas.find((conta)=>{
        return conta.numero === Number(numero_conta)
    })
    if(!contaAtual){
        return res.status(404).json({mensagem:'Conta nao encontrada'})
    }
    if (senha === ""){
        return res.status(400).json({mensagem:'Senha deverá ser informada'})
    }
    if(senha != contaAtual.usuario.senha){
        return res.status(401).json({mensagem: 'Senha invalida'})
    }
    return res.status(200).json({saldo:contaAtual.saldo})
}
const extrato = (req,res)=>{
    const {numero_conta,senha} = req.query
    
    const contaAtual = contas.find((conta)=>{
        return conta.numero === Number(numero_conta)
    })
    if(!contaAtual){
        return res.status(404).json({mensagem:'Conta nao encontrada'})
    }
    if (senha === ""){
        return res.status(400).json({mensagem:'Senha deverá ser informada'})
    }
    if(senha != contaAtual.usuario.senha){
        return res.status(401).json({mensagem: 'Senha invalida'})
    }

    const depositosFeitos = depositos.filter((deposito)=>{
        return deposito.numero_conta === numero_conta
    })
    const saquesFeitos = saques.filter((saque)=>{
        return saque.numero_conta === numero_conta
    })
    const transferenciasEnviadas = transferencias.filter((transferencia)=>{
        return transferencia.numero_conta_origem === numero_conta
    })
    const transferenciasRecebidas = transferencias.filter((transferencia)=>{
        return transferencia.numero_conta_destino === numero_conta
    })
    let extrato ={
        depositos:depositosFeitos,
        saques: saquesFeitos,
        transferenciasEnviadas,
        transferenciasRecebidas,
    }

    return res.status(200).json(extrato)
}

module.exports= {depositar,sacar,transferir,saldo, extrato}