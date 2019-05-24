import { expect } from 'chai';
import knexCleaner from 'knex-cleaner';
import db, { migrate } from '../../src/db';

const migrateAndExpect = async () => {
  await migrate();

  expect(db.schema.hasTable('providers')).to.eventually.equal(true);
  expect(db.schema.hasTable('refresh_tokens')).to.eventually.equal(true);
};

describe('database layer', () => {
  it('should create tables when not exist', async () => {
    await knexCleaner.clean(db, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] });
    return migrateAndExpect();
  });

  it('should not fail when already exist', migrateAndExpect);
});
