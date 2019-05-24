exports.up = async (knex) => {
  await knex.schema.createTable('providers', (table) => {
    table.string('user_id').notNullable();
    table.string('provider').notNullable();
    table.string('provider_id').notNullable();
    table.string('access_token').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('expires_in').nullable();
    table.string('refresh_token').nullable();

    table.unique(['user_id', 'provider']);
    table.unique(['provider_id', 'provider']);
  });

  return knex.schema.createTable('refresh_tokens', (table) => {
    table.string('token').primary();
    table.string('user_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('providers');
  await knex.schema.dropTableIfExists('refresh_tokens');
};
