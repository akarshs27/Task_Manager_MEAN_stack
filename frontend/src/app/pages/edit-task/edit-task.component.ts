import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Task } from '../../shared/model/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  listId: string;
  taskId: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
        this.taskId = params.taskId;
        console.log(this.listId);
      });
  }

  editTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(
      () => {
        this.router.navigate(['/lists', this.listId]);
      }
    );
  }
}
