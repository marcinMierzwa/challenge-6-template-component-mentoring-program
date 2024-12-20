import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Article } from './models/article-model';
import { ArticleApi } from './models/articleApi-model';
import { ArticleCreate } from './models/articleCreate-model';
import { ArticleEdit } from './models/articleEdit-model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  httpClient: HttpClient = inject(HttpClient);

  private articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$: Observable<Article[]> = this.articlesSubject.asObservable();

  getAll() {
    this.httpClient
      .get<ArticleApi[]>(
        'https://636ce2d8ab4814f2b2712854.mockapi.io/articles-with-comments'
      )
      .pipe(
        map((articles: ArticleApi[]) =>
          articles.map((article: ArticleApi) => ({
            title: article.title,
            imageUrl: article.imageUrl,
            content: article.content,
            id: article.id,
            showImage: article.showImage,
          }))
        )
      )
      .subscribe({
        next: (articles: Article[]) => {
          this.articlesSubject.next(articles);
        },
        error: (err) => {
          console.error('Fetch data error:', err);
        },
      });
  }

  create(article: ArticleCreate): Observable<ArticleApi> {
    return this.httpClient.post<ArticleApi>(
      'https://636ce2d8ab4814f2b2712854.mockapi.io/articles-with-comments',
      article
    );
  }

  update(article: ArticleEdit): Observable<ArticleApi> {
    return this.httpClient.put<ArticleApi>(
      `https://636ce2d8ab4814f2b2712854.mockapi.io/articles-with-comments/${article.id}`,
      article
    );
  }
}
