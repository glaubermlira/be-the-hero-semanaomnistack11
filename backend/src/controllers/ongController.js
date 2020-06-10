const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    /**
    * Listar dados da ONG;
    */
    async index(req, res) {
        const ongs = await connection('ongs').select('*');

        return res.json(ongs);
    },
    /**
    * Cadastro de ONG's
    * Funções Assíncronas(async)
    */
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        /**
         * Consultar documentação do NodeJs -> Criar 4 bytes de caracteres especiais para gerar uma id;
         * Esse id é o que vai ser usado para acessar a aplicação;
         */
        const id = crypto.randomBytes(4).toString('HEX');

        /**
        * Cadastrar e Listar os incidentes da nossa aplicação;
        */
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return res.json({ id });
    }
}