import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../../Task';

@Component({
  moduleId: module.id,
  selector: 'tasks',
  templateUrl: 'tasks.component.html'
})

export class TasksComponent {

  tasks: Task[];
  title: string;

  constructor(private taskService:TaskService){
    this.taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  addTask(event) {
    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: false
    };

    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
      });
  }

  deleteTask(task, index) {
    if(!task) return false;
    this.taskService.deleteTask(task)
      .subscribe(data => {
        if(data.n == 1) this.tasks.splice(index, 1);
      });
  }

  updateStatus(task, index) {
    if(!task) return false;
    var _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };
    this.taskService.updateStatus(_task)
      .subscribe(data => {
        task.isDone = !task.isDone;
      });
  }
}
