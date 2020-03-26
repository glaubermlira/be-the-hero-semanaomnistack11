const express = require('express');
const routes = require('./routes');
const cors = require('cors');



const app = express();

app.use(cors());
app.use(express.json()); // Transformar os arquivos (.json) em objeto javascript para que minha aplicação possa identificar; 
app.use(routes);

app.listen(3333);

/**
 * Rota / Recurso
 */

/**
 * Métodos HTTP:
 *
 * GET: Buscar uma infomação do back-end;
 * POST: Criar uma informação no back-end;
 * PUT: Alterar uma informação no back-end;
 * DELETE: Deletar uma informação no back-end
 */

/**
 * Tipos de Parâmetros:
 *
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, Paginação);
 * Route Params: Parâmetros utilizados para identificar recursos;
 * Request Body: Corpo da Requisição, utilizado para criar ou alterar recursos;
 */

/**
 * Tipos de Bancos de Dados:
 *
 * SQL: MySQL, SQLite(Utilizado na SemanaOmnistack), PostgreSQL, Oracle...
 * NoSQL: MongoDB, CouchDB ...(Não-Relacionais)
 *
 * Métodos:
 * Driver: SELECT * FROM users => (Abordagem padrão no SQL);
 * Query Builder: table('users').select('*').where() => (Abordagem na forma de Javascript);
 */

