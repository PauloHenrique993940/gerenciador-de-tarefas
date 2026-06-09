import { CommonModule } from "@angular/common";
import { Component, ElementRef, inject, signal, viewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TaskItemComponent } from "../task-tem/task-item.component";
import { TaskPriority } from '../../models/task.model';
import { TaskService } from "../../services/task.service";


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TaskItemComponent,

  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  taskService = inject(TaskService);
  taskIInput = viewChild<ElementRef<HTMLInputElement>>('taskInput');

  newTaskTitle= signal('');
  newTaskPriority = signal<TaskPriority>('Média');
  priorities: TaskPriority[] = ['Baixa', 'Média', 'Alta'];


  addTask(){
    if(this.newTaskTitle().trim()){
      this.taskService.addTask(this.newTaskTitle(), this.newTaskPriority());
      this.newTaskTitle.set('');
      this.taskIInput()?.nativeElement.focus();
    }
  }

  getAllTasks(){
    return this.taskService.filteredTasks();
  }

  toggleTaskStatus(id: string) {
    this.taskService.toggleTaskStatus(id);
  }

  deleteTask(id: string){
    this.taskService.deleteTask(id);
  }
}

