import { Component, inject } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@Component({
  selector: "app-task-stats",
  standalone: true,
  imports:[
    CommonModule,
    MatProgressBarModule,
    MatCardModule
  ],
  templateUrl: "./task-stats.component.html",
  styleUrls: ["./task-stats.component.scss"],
})

export class TaskStatsComponent {
  private taskService = inject(TaskService);
  stats = this.taskService.stats;
}
