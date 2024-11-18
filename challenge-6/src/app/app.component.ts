import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FooterComponent } from './footer.component';
import { CardComponent } from './card.component';
import { FormComponent } from './form.component';
import { Article } from './models/article-model';
import { ArticleDataForm } from './models/articleDataForm-models';
import { ArticleApi } from './models/articleApi-model';
import { ArticleMode } from './models/articleMode-model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FooterComponent, CardComponent, FormComponent],
})
export class AppComponent implements OnInit {

 //delete this!!!!!!!!!!!!! -->
  constructor() {
    effect(() => {
      console.log(this.articles());
      console.log(this.articleMode());
      console.log(this.articlePreview());
    });
  }
  ngOnInit(): void {
    this.articlesService.getAll();
  }
  title = 'mentoring-program-starter-kit';
  articlesService: ArticlesService = inject(ArticlesService);
  articles: Signal<Article[]> = toSignal(this.articlesService.articles$, { initialValue: [] });
  articlePreview = signal<Article>({
    title: '',
    imageUrl: '',
    content: '',
    showImage: true,
    id: 0,
  });
  articleMode = signal<ArticleMode>(ArticleMode.INIT);

  isOpenCreateEditMode: Signal<boolean> = computed(() => {
    return this.articleMode() !== ArticleMode.INIT;
  });
  isScrollVisible: Signal<boolean> = computed(() => {
    return this.isOpenCreateEditMode();
  });

  private scrollVisibilityEffect = effect(() => {
    document.body.style.overflow = this.isOpenCreateEditMode()
      ? 'hidden'
      : 'visible';
  });

  setModeHeader: Signal<string> = computed(() => {
    return this.articleMode() === ArticleMode.CREATE
      ? ArticleMode.CREATE
      : ArticleMode.EDIT;
  });

  

  create(): void {
    this.articlePreview.set({
      title: '',
      imageUrl: '',
      content: '',
      showImage: true,
      id: 0,
    });
    this.articleMode.set(ArticleMode.CREATE);
  }

  edit(id: number) {
    this.articles().find((article: Article) => {
      if (article.id === id) {
        this.articlePreview.set({ ...article });
      }
    });
    this.articleMode.set(ArticleMode.EDIT);
  }

  handlePreviewArticle(article: Article) {
    this.articlePreview.set(article);
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

  closeCreateEditMode() {
    this.articleMode.set(ArticleMode.INIT);
  }

  // to backend
  handleSubmitForm(article: ArticleDataForm): void {
    const { imageUrl, title, content, showImage, id, mode } = article;
    if (mode === 'Create Mode') {
      this.articlesService
        .create({ imageUrl, title, content, showImage: !showImage })
        .subscribe({
          next: (response: ArticleApi) => {
            alert(`Article "${response.title}" created successfully!`);
            this.articlesService.getAll();
            this.articleMode.set(ArticleMode.INIT);
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
          this.articleMode.set(ArticleMode.INIT);

        },
        error: (err) => {
          alert(`Error updateing article:, ${err.message}`);
        },
      });
    }
  }
}

