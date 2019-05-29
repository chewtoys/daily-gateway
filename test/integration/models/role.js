import { expect } from 'chai';
import knexCleaner from 'knex-cleaner';
import db, { migrate } from '../../../src/db';
import role from '../../../src/models/role';

describe('role model', () => {
  beforeEach(async () => {
    await knexCleaner.clean(db, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] });
    return migrate();
  });

  it('should add new role to db', async () => {
    const model = await role.add('1', 'admin');
    expect(model).to.deep.equal({ userId: '1', role: 'admin' });
  });

  it('should return empty array when roles', async () => {
    const models = await role.getByUserId('1');
    expect(models).to.deep.equal([]);
  });

  it('should fetch roles by user id', async () => {
    await role.add('1', 'admin');
    await role.add('1', 'moderator');
    await role.add('2', 'admin');
    const models = await role.getByUserId('1');
    expect(models).to.deep.equal(['admin', 'moderator']);
  });
});
