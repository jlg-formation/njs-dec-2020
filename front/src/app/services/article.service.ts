import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[]>(this.getArticles());

  constructor() {
    this.articles$.subscribe((articles) =>
      localStorage.setItem('articles', JSON.stringify(articles))
    );
  }

  getArticles(): Article[] {
    const str = localStorage.getItem('articles');
    if (!str) {
      return [
        { name: 'Tournevis', price: 2.34, qty: 120 },
        { name: 'Tournevis Cruciforme', price: 2.55, qty: 55 },
      ];
    }
    return JSON.parse(str) as Article[];
  }

  add(article: Article): void {
    this.articles$.value.push(article);
    this.articles$.next(this.articles$.value);
  }
}
