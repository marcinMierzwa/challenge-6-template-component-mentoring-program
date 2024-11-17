import { Component, inject, signal, Signal } from '@angular/core';
import { ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FooterComponent } from './footer.component';
import { CardComponent } from './card.component';
import { FormComponent } from './form.component';
import { Article } from './models/article-model';
import { ArticleDataForm } from './models/articleFormData-models';
import { ArticleApi } from './models/articleApi-model';

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
  article = signal<Article>({
    title: '',
    imageUrl: '',
    content: '',
    showImage: true,
    id: 0,
  });
  mode = signal<string>('');
  isVisibleMode = signal<boolean>(true);

  create(): void {
    this.article.set({
      title: '',
      imageUrl: '',
      content: '',
      showImage: true,
      id: 0,
    });
    this.mode.set('Create Mode');
    this.isVisibleMode.update((isVisibleMode) => !isVisibleMode);
    this.toggleScrollVisibility(true);
  }

  edit(id: number) {
    console.log(id);

    this.articles().find((article: Article) => {
      if (article.id === id) {
        this.article.set(article);
      }
    });
    this.isVisibleMode.update((isVisibleMode) => !isVisibleMode);
    this.mode.set('Edit Mode');
    this.toggleScrollVisibility(true);
  }

  handlePreviewArticle(article: Article) {
    this.article.set(article);
  }

  handleSubmitForm(article: ArticleDataForm): void {
    const { imageUrl, title, content, showImage, id, mode } = article;
    if (mode === 'Create Mode') {
      this.articlesService
        .create({ imageUrl, title, content, showImage: !showImage })
        .subscribe({
          next: (response: ArticleApi) => {
            alert(`Article "${response.title}" created successfully!`);
            this.articlesService.getAll();
          },
          error: (err) => {
            alert(`Error creating article:, ${err.message}`);
          },
        });
    }
    if (mode === 'Edit Mode') {
      this.articlesService.update(article).subscribe({
        next: (response: ArticleApi) => {
          alert(`Article "${response.title}" updated successfully!`);
          this.articlesService.getAll();
        },
        error: (err) => {
          alert(`Error updateing article:, ${err.message}`);
        },
      });
    }
  }

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

  closeActiveMode(): void {
    this.isVisibleMode.update((isVisibleMode) => !isVisibleMode);
    this.toggleScrollVisibility(false);
  }

  toggleScrollVisibility(isScrollVisible: boolean): void {
    document.body.style.overflow = isScrollVisible ? 'hidden' : 'visible';
  }
}
