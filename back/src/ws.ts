import express from 'express';
// eslint-disable-next-line node/no-unsupported-features/node-builtins
import {readFileSync, promises} from 'fs';
import {resolve} from 'path';
import {Article} from './Article';
import {BehaviorSubject} from 'rxjs';

const filename = resolve(__dirname, '../data/articles.json');

let articles = JSON.parse(
  readFileSync(filename, {encoding: 'utf8'})
) as Article[];

const articles$ = new BehaviorSubject<Article[]>(articles);

articles$.subscribe(myArticles => {
  (async () => {
    await promises.writeFile(filename, JSON.stringify(myArticles, null, 2));
  })();
});

let nextId = 3;

const app = express.Router();

app.use(express.json());

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.post('/articles', async (req, res) => {
  const article = req.body as Article;
  article.id = 'a' + nextId;
  nextId++;
  articles.push(article);
  articles$.next(articles);
  res.status(201).json(article);
});

app.delete('/articles', async (req, res) => {
  const ids = req.body as string[];
  articles = articles.filter(a => !ids.includes(a.id));
  articles$.next(articles);
  res.status(204).end();
});

app.get('/date', (req, res) => {
  res.json({date: new Date()});
});

export const ws = app;
