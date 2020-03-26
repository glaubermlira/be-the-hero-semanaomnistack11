
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        // Chave primária
        table.increments();
        // Campos da tabela
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        // Relacionamento
        table.string('ong_id').notNullable();
        // Chave Estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};
