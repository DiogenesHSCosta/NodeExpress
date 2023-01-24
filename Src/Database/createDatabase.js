//Criação do banco de dados com SQLite

import sqlite3 from "sqlite3";
import path from "path"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
                                    //colocar caminho da pasta atual    //nome do arquivo
const caminhoArq = path.resolve(dirname(fileURLToPath(import.meta.url)), "database.db")

//variavel responsavel pelos comandos do banco
const db = new sqlite3.Database(caminhoArq)

//texto pra ativar as chaves estrangeiras no SQLite
const pragma =`PRAGMA foreign_keys = ON`

//ativar chave estrangeira
function enableForeignKey(){
    db.run(pragma, (erro) =>{
        if(erro) console.log("Erro in process of creation exec 'pragma'")
    })
}
//Criação da tabela User
const USERS_SCHEMAS = `
CREATE TABLE user (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(80),
    email VARCHAR(80),
    senha VARCHAR(100)
)`

function createTableUser(){
    db.run(USERS_SCHEMAS, (erro) =>{
        if(erro) console.log("Erro in process of creation table 'USER'")
    })
}

db.serialize(()=>{
    enableForeignKey()
    createTableUser()
})