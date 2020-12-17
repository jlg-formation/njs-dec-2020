import {Client} from 'pg';
import {db1} from '../database.json';

async function main() {
  const client = new Client(db1);
  await client.connect();
  const res = await client.query('SELECT $1::text as message', [
    'Hello world!',
  ]);
  console.log(res.rows[0].message); // Hello world!
  await client.end();
}

main();
