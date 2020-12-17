import {Client} from 'pg';
import {db1} from '../database.json';

async function main() {
  const client = new Client(db1);
  await client.connect();

  const text =
    'INSERT INTO articles(name, price, qty) VALUES($1, $2, $3) RETURNING *';
  const values = ['Tournevis', 2.33, 123];

  try {
    const res = await client.query(text, values);

    const ids = [4, 5, 6];
    await client.query(
      `DELETE FROM articles WHERE id in (${ids
        .map((n, i) => '$' + (i + 1))
        .join(',')})`,
      ids
    );
    console.log(res.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }

  await client.end();
}

main();
