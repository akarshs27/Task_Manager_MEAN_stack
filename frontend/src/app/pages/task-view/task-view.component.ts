import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Task } from '../../shared/model/task.model';
import { List } from '../../shared/model/list.model';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];
  selectedList;
  constructor( private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          console.log(params);
          console.log('getting the lists');
          this.selectedList = params.listId;
          this.taskService.getTasks(params.listId).subscribe(
            (tasks: Task[]) => {
              console.log(tasks);
              this.tasks = tasks;
            });
        }
        else {
          console.log('not getting the lists');
          this.tasks = undefined;
        }
      }
    );

    this.taskService.getLists().subscribe(
      (lists: List[]) => {
        console.log(lists);
        this.lists = lists;
      });
  }

  onTaskClick(task: Task) {
    this.taskService.completed(task).subscribe( () => {
      console.log('Completed Successfully');
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    this.taskService.delete(this.selectedList).subscribe((res: any) => {
      console.log(res);
      console.log('Deleted list');
      this.router.navigate(['/lists']);
    });
  }

  onDeleteTask(id: string) {
    this.taskService.deleteTask(this.selectedList, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    });
  }
}
