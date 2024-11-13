import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Article, ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FooterComponent } from './footer.component';
import { CardComponent } from './card.component';

export enum ArticleState {
  INIT = "initial state",
  CREATE = "create state",
  EDIT = "edit state"
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FooterComponent, CardComponent],
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  articlesService: ArticlesService = inject(ArticlesService);
  articles: Signal<Article[]> = toSignal(this.articlesService.getAll(), {
    initialValue: [],
  });
  articleState = signal<ArticleState>(ArticleState.INIT);

  handleShowImageButtonClick(id: number): void {
    this.articles().find((article: Article) => {
      if (article.id === id) {
        article.showImage = !article.showImage;
      }
    });
  }

  getButtonLabel(showImage: boolean): string {
    return showImage ? 'Hide Image' : 'Show Image';
  }
  
}
