import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class TodosService {

  getTodos( filter ) {
    const todos = [{id: 1, title: "Learn ngrx/store", completed: true}, {
      id: 2,
      title: "Learn ngrx/effects",
      completed: false,
    }];
    return Observable.timer(500)
      .mapTo(this.getVisibleTodos(todos, filter))
  }

  addTodo( title ) {
    return Observable.timer(2000)
      .mapTo({id: Math.random(), title, completed: false})
  }

  getVisibleTodos( todos, filter ) {
    if( filter === "SHOW_ALL" ) {
      return todos;
    } else if( filter === "SHOW_COMPLETED" ) {
      return todos.filter(t => t.completed);
    } else {
      return todos.filter(t => !t.completed);
    }
  }

}
