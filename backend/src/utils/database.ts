import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});

export default pool.promise();
