import { Component, inject, Signal } from '@angular/core';
import { Footer } from "./footer.component";
import { Article, ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [Footer],
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  articlesService: ArticlesService = inject(ArticlesService);
  articles: Signal<Article[]> = toSignal(this.articlesService.getAll(), {initialValue: []});  
}
