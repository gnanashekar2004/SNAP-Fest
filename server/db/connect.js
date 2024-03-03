import pkg from 'pg';
const { Pool } = pkg;
 
const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'pavan931',
  database: 'dbms',
  port: 5432
});

export default pool;
