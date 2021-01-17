exports.up = (knex) => knex.schema.table('visits', (table) => {
  table.index('user_id');
  table.index('app');
});

exports.down = (knex) => knex.schema.table('visits', (table) => {
  table.dropIndex('user_id');
  table.dropIndex('app');
});
