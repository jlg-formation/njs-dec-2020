import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.34, qty: 120 },
    { name: 'Tournevis Cruciforme', price: 2.55, qty: 55 },
  ];

  constructor() {}

  add(article: Article): void {
    this.articles.push(article);
  }
}
