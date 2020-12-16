import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  selectedArticles: Article[] = [];

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {}

  toggle(article: Article): void {
    if (this.selectedArticles.includes(article)) {
      this.selectedArticles = this.selectedArticles.filter(
        (a) => a !== article
      );
      return;
    }
    this.selectedArticles.push(article);
  }
}
