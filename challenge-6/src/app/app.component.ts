import { Component, inject, Signal } from '@angular/core';
import { Article, ArticlesService } from './articles.service';
import { toSignal } from '@angular/core/rxjs-interop'
import { FooterComponent } from './footer.component';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FooterComponent, CardComponent,]
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  articlesService: ArticlesService = inject(ArticlesService);
  articles: Signal<Article[]> = toSignal(this.articlesService.getAll(), {initialValue: []});  
}
