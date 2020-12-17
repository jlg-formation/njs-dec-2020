import express from 'express';
import {Article} from './Article';

const articles = [
  {id: 'a1', name: 'Tournevis', price: 2.34, qty: 120},
  {id: 'a2', name: 'Pince xxx', price: 2.55, qty: 55},
];

let nextId = 3;

const app = express.Router();

app.get('/articles', (req, res) => {
  res.json(articles);
});

app.post('/articles', (req, res) => {
  const article = req.body as Article;
  article.id = 'a' + nextId;
  nextId++;
  articles.push(article);
  res.status(201).json(article);
});

app.get('/date', (req, res) => {
  res.json({date: new Date()});
});

export const ws = app;
