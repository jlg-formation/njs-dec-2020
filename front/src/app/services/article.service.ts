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
      return [];
    }
    return JSON.parse(str) as Article[];
  }

  add(article: Article): void {
    this.articles$.value.push(article);
    this.articles$.next(this.articles$.value);
  }

  remove(selectedArticles: Article[]): void {
    const articles = this.articles$.value.filter(
      (a) => !selectedArticles.includes(a)
    );
    this.articles$.next(articles);
  }
}
