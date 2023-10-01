# Estudo-API-REST
Estudo de API de um banco digital utilizando a tecnologia JavaScript

Este projeto tem como objetivo criar uma API RESTful para um Banco Digital utilizando os seguintes endepoints:

Listar contas bancárias (/contas?senha_banco=Cubos123Bank), 

Criar conta bancária (/contas), 

Atualizar usuário da conta bancária (/contas/:numeroConta/usuario), 

Excluir conta (/contas/:numeroConta), 

Depositos (/transacoes/depositar), 

Saques (/transacoes/sacar), 

Transferências(/transacoes/transferir), 

Saldo (/contas/saldo?numero_conta=123&senha=123) e 

Extratos (contas/extrato?numero_conta=123&senha=123).

Foi implementado middlewares para cada endepoint com o foco na otimização do código, também foi utilizado as bibliotecas: express, nodemon e date-fns-tz.
![Captura de tela 2023-10-01 173828](https://github.com/Lola-snt/Estudo-API-REST/assets/122684180/a5fa601a-3b39-44e9-ac54-2340fb7d1a94)
