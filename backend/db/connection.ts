import mysql from 'mysql2/promise';
import config from './config';

declare global {
   var pool: mysql.Pool | undefined;
}

if (!globalThis.pool) {
   globalThis.pool = mysql.createPool(config);
   console.log('-- CREATED NEW MYSQL POOL --');
}
const pool = globalThis.pool;
export default pool;
