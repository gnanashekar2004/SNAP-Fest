import pkg from 'pg';
const { Pool } = pkg;
 
const pool = new Pool({
  host: '10.5.18.69',
  user: '21CS10060',
  password: '21CS10060',
  database: '21CS10060',
  port: 5432
});

export default pool;
