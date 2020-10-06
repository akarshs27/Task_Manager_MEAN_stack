import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private webReq: WebRequestService) { }

  getLists() {
   return this.webReq.get('lists');
  }

  createList(title: string) {
  return this.webReq.post('lists', { title });
  }

  updateList(id: string, title: string) {
    return this.webReq.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    return this.webReq.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  delete(id: string) {
    return this.webReq.delete(`lists/${id}`);
  }

  deleteTask(listId: string, id: string) {
    return this.webReq.delete(`lists/${listId}/tasks/${id}`);
  }

  getTasks(title: string) {
   return this.webReq.get(`lists/${title}/tasks`);
  }

  createTask(title: string, listId: string) {
  return this.webReq.post(`lists/${listId}/tasks`, { title });
  }

  completed(task: Task) {
    return this.webReq.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
