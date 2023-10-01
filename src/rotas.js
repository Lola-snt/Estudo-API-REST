const express = require('express')
const { listarContas, criarContas, atualizarUsuario, excluirConta } = require('./controladores/contas')
const senha = require('./middlewares/acesso_admin')
const { depositar, sacar, transferir, saldo, extrato } = require('./controladores/transacoes')
const senhaAdmin = require('./middlewares/acesso_admin')
const { validarNumeroContaPath, validarNumeroContaBody, validarNumeroContaQuery } = require('./middlewares/validarConta')
const { validarValor } = require('./middlewares/validarValor')
const { validarCamposUsuario } = require('./middlewares/validarCampoUsuario')

const rotas = express()
rotas.get('/contas',senhaAdmin, listarContas )
rotas.post('/contas',validarCamposUsuario, criarContas)
rotas.put('/contas/:numeroConta/usuario',validarNumeroContaPath, atualizarUsuario)
rotas.delete('/contas/:numeroConta',validarNumeroContaPath, excluirConta )
rotas.post('/transacoes/depositar', validarNumeroContaBody, validarValor, depositar)
rotas.post('/transacoes/sacar',validarNumeroContaBody,validarValor, sacar )
rotas.post('/transacoes/transferir',validarValor, transferir)
rotas.get('/contas/saldo',validarNumeroContaQuery, saldo)
rotas.get('/contas/extrato',validarNumeroContaQuery, extrato)



module.exports= rotas