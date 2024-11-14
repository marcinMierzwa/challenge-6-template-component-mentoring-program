import {
  Component,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { Article, ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FooterComponent } from './footer.component';
import { CardComponent } from './card.component';
import { FormComponent } from './form.component';

export enum ArticleMode {
  INIT = "Initial Mode",
  CREATE = "Create Mode",
  EDIT = "Edit Mode"
}

export interface CreateArticle {
  title: string;
  imageUrl: string;
  content: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FooterComponent, CardComponent, FormComponent],
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  articlesService: ArticlesService = inject(ArticlesService);
  articles: Signal<Article[]> = toSignal(this.articlesService.getAll(), {
    initialValue: [],
  });
  articleMode = signal<ArticleMode>(ArticleMode.INIT);

  showImage(id: number): void {
    this.articles().find((article: Article) => {
      if (article.id === id) {
        article.showImage = !article.showImage;
      }
    });
  }

  toggleButtonLabel(showImage: boolean): string {
    return showImage ? 'Hide Image' : 'Show Image';
  }

  addNewArticle(): void {
    this.articleMode.set(ArticleMode.CREATE);
  }
  

  
}
