const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        /**
         * Esquema de Paginação:
         * Na primeira página irá listar as cinco primeiras ONG's,começa a partir do zero e pega os cinco primeiros registros.
         * Na segunda página vai fazer ((2-1=1)*5), vai pegar pulando os cinco primeiros registros,
         * os próximos cinco e assim por diante;         * 
         */
        const { page = 1 } = req.query;
        //Contador de total de ONG's cadastradas;
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        //retornar o total de resgistros no cabeçalho;
        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },
    async create(req, res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return res.json({ id });
    },
    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            //Error 401 -> `Acesso não autorizado`(Ver mais em: http status code);
            return res.status(401).json({ error: 'Operation not permitted' });
        }
        //Deletar os registros de dentro de nossa tabela;
        await connection('incidents').where('id', id).delete();
        /**
         * Error(204) -> Retorna o status para o front-end,
         * É uma resposta que deu sucesso mas não tem conteúdo para retornar; 
         */
        return res.status(204).json();
    }
};
