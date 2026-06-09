import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskFiltersComponent } from '../components/task-filters/task-filters.components';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskStatsComponent } from '../components/task-stats/task-stats.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    TaskFiltersComponent,
    TaskListComponent,
    TaskStatsComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('gerenciador-de-tarefas');
}
