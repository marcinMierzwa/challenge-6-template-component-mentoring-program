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
import { CreateEditArticle, FormComponent } from './form.component';


export interface PreviewArticle {
  title: string;
  imageUrl: string;
  content: string;
  showImage: boolean;
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
  previewArticle: PreviewArticle = {
    title: '',
    imageUrl: '',
    content: '',
    showImage: true
  }
  titleMode = signal<string>('');
  isVisibleMode = signal<boolean>(true);

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

  createArticle(): void {
    this.titleMode.set('Create Mode');
    this.isVisibleMode.update( isVisibleMode => !isVisibleMode);
    this.toggleScrollVisibility(true);
  }

  editArticle(articleId: number) {
    this.isVisibleMode.update( isVisibleMode => !isVisibleMode);
    this.titleMode.set('Edit Mode');
  }

  handleCreateArticle(article: CreateEditArticle): void {
    console.log(article);
    
    this.previewArticle = { ...article, showImage: true };
    // this.isVisibleMode.update( isVisibleMode => !isVisibleMode);
  }

  editArticleMode(): void {
  }

  closeActiveMode(): void {
    this.isVisibleMode.update( isVisibleMode => !isVisibleMode);
    this.toggleScrollVisibility(false);
  }

  
  toggleScrollVisibility(isScrollVisible: boolean): void {
    document.body.style.overflow = isScrollVisible ? 'hidden' : 'visible';
  }


  
}
