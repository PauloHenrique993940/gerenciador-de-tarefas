import { computed, effect, Injectable, signal } from '@angular/core';
import { Task, TaskFilters, TaskPriority } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskSignal = signal<Task[]>(this.loadFromLocalSTorage());

  tasks = this.taskSignal.asReadonly();

  filters = signal<TaskFilters>({
    search: '',
    priority: 'Todas',
    status: 'Todos',
  });

  filteredTasks = computed(() => {
    const tasks = this.taskSignal();
    const { search, priority, status } = this.filters();

    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
      const matchesPriority = priority === 'Todas' || task.priority === priority;
      const matchesStatus = status === 'Todos' || task.status === status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  });

  stats = computed(() => {
    const tasks = this.taskSignal();
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === 'Concluída').length;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      total,
      completed,
      progress,
    };
  });

  constructor() {
    effect(() => {
      localStorage.setItem('smart-tasks', JSON.stringify(this.taskSignal()));

    });
  }

  addTask(title: string, priority: TaskPriority)  {
    const newTask: Task ={
      id: crypto.randomUUID(),
      title,
      priority,
      status: 'Pendente',
      createdAt: new Date(),
    };

    this.taskSignal.update(tasks=> [newTask, ...tasks]);



  }

  toggleTaskStatus(id: string){
    this.taskSignal.update(tasks => tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === 'Pendente' ? 'Concluída' : 'Pendente'
        };
      }
      return task;
    }));
  }

  deleteTask(id: string){
    this.taskSignal.update(tasks => tasks.filter(task => task.id !== id));
  }

  updateFilters(partialFilters: Partial<TaskFilters>){
    this.filters.update(filters => ({ ...filters, ...partialFilters }));
  }

  resetFilters(){
    this.filters.set({
      search: '',
      priority: 'Todas',
      status: 'Todos',
    });

  }

  private loadFromLocalSTorage(): Task[] {
    try {
      const data = localStorage.getItem('smart-tasks');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Falha ao carregar tarefas do localStorage', error);
      return [];
    }
  }
}
