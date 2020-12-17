import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArticleService } from './article.service';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
  constructor(private http: HttpClient) {
    super();
    console.log('http article service');
    this.refresh();
  }

  refresh(): void {
    this.http.get<Article[]>('http://localhost:3000/ws/articles').subscribe({
      next: (articles) => {
        console.log('articles: ', articles);
        this.articles$.next(articles);
      },
      error: (err) => {
        console.log('err: ', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  add(article: Article): void {
    super.add(article);
    this.http
      .post<void>('http://localhost:3000/ws/articles', article)
      .subscribe({
        next: () => {
          console.log('article added...');
          this.refresh();
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  remove(selectedArticles: Article[]): void {
    super.remove(selectedArticles);
    const ids = selectedArticles.map((a) => a.id);
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(ids),
    };
    this.http
      .delete<void>('http://localhost:3000/ws/articles', options)
      .subscribe({
        next: () => {
          console.log('articles removed...');
          this.refresh();
        },
        error: (err) => {
          console.log('err: ', err);
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
