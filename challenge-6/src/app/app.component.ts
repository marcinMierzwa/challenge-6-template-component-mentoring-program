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


export interface CreateEditArticle {
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
  article: CreateEditArticle = {
    title: '',
    imageUrl: '',
    content: ''
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

  handleCreateArticle(newArticle: CreateEditArticle ): void {
    console.log(newArticle);
    
  }

  editArticle(): void {
    this.titleMode.set('Edit Mode');
  }

  closeActiveMode(): void {
    this.isVisibleMode.update( isVisibleMode => !isVisibleMode);
    this.toggleScrollVisibility(false);
  }

  
  toggleScrollVisibility(isScrollVisible: boolean): void {
    document.body.style.overflow = isScrollVisible ? 'hidden' : 'visible';
  }


  
}
