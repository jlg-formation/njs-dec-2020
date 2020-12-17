import express from 'express';
import {Client} from 'pg';
import {Article} from './Article';

export function ws(client: Client) {
  const app = express.Router();

  app.use(express.json());

  app.get('/articles', (req, res) => {
    (async () => {
      try {
        const rs = await client.query(
          'SELECT id, name, price, qty FROM articles'
        );
        res.json(rs.rows);
      } catch (error) {
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  app.post('/articles', async (req, res) => {
    const article = req.body as Article;
    (async () => {
      try {
        const rs = await client.query(
          'INSERT INTO articles(name, price, qty) VALUES($1, $2, $3) RETURNING *',
          [article.name, article.price, article.qty]
        );
        res.status(201).json(rs.rows[0]);
      } catch (error) {
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  app.delete('/articles', async (req, res) => {
    const ids = req.body as string[];
    (async () => {
      try {
        await client.query(
          `DELETE FROM articles WHERE id in (${ids
            .map((n, i) => '$' + (i + 1))
            .join(',')})`,
          ids
        );
        res.status(204).end();
      } catch (error) {
        console.log('error: ', error);
        res.status(500).end();
      }
    })();
  });

  app.get('/date', (req, res) => {
    res.json({date: new Date()});
  });
  return app;
}
