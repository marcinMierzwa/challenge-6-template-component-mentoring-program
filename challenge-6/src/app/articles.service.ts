import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

export interface ArticleApi {
  createdAt: string;
  title: string;
  imageUrl: string;
  content: string;
  comments: [
    {
      text: string;
      user: {
        avatar: string;
        name: string;
      }
    }
  ]
  id: number;
  showImage: boolean;
}

export interface Article {
  title: string;
  imageUrl: string;
  content: string;
  id: number;
  showImage: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  httpClient: HttpClient = inject(HttpClient);

  getAll(): Observable<Article[]> {
    return this.httpClient
      .get<ArticleApi[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/articles-with-comments')
      .pipe(
        map((articles: ArticleApi[]) =>
          articles.map((article: ArticleApi) => ({
            title: article.title,
            imageUrl: article.imageUrl,
            content: article.content,
            id: article.id,
            showImage: article.showImage
          }))
        ),
      );
  }
}
