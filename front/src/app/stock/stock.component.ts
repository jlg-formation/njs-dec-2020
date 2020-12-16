import { Component, OnInit } from '@angular/core';
import { Article } from '../interfaces/article';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  articles: Article[] = [
    { name: 'Tournevis', price: 2.34, qty: 120 },
    { name: 'Tournevis Cruciforme', price: 2.55, qty: 55 },
  ];

  constructor() {}

  ngOnInit(): void {}
}
