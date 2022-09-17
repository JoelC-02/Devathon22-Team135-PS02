import { pool } from './pool.js';

class Model {
  constructor(table) {
    this.pool = pool;
    this.table = table;
    this.pool.on('error', (err, client) => `Error, ${err}, on idle client${client}`);
  }

  async select(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause) query += clause;
    return this.pool.query(query);
  }

  async selectWhere(columns, clause) {
    let query = `SELECT ${columns} FROM ${this.table} WHERE Date='${clause}'`;
    return this.pool.query(query);
  }

  async selectLimit(columns, limit) {
    let query = `SELECT ${columns} FROM ${this.table} WHERE Date <= DATEADD(day,${limit}, GETDATE())' AND Date >= GETDATE()`;
    return this.pool.query(query);
  }

  async selectWherePass(columns, clause, clause2) {
    let query = `SELECT id FROM ${this.table} WHERE Email='${clause}' AND Password='${clause2}'`;
    return this.pool.query(query);
  }

  async insertWithReturn(columns, values) {
    const query = `
          INSERT INTO ${this.table}(${columns})
          VALUES (${values})
          RETURNING id, ${columns}
      `;
    return this.pool.query(query);
  }

  async updateWithReturn(columns, email) {
    const query = `
          UPDATE ${this.table}
          SET ${columns}
          WHERE Email='${email}'
          RETURNING id
      `;
    return this.pool.query(query);
  }
}

export default Model;