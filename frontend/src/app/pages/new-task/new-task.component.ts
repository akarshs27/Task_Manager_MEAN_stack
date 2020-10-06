import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from '../../shared/model/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId: string;
  constructor( private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
    (params: Params) => {
      this.listId = params.listId;
      console.log(this.listId);
    });
  }

  createNewTask(title: any) {
    this.taskService.createTask(title, this.listId).subscribe(
      (newTask: Task) => {
        console.log(newTask);
      }
    );
    this.router.navigate(['../lists', {relativeTo: this.router}]);
  }

}
