import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getTodos, ADD_TODO_SUCCESS, setVisibilityFilter, toggleTodo, addTodo } from "../app.module";
import { TodosEffects } from "../todos.effects";

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html'
})
export class TodosPageComponent {

  todos$ : Observable<any>;
  activeFilter$ : Observable<any>;
  addTodoSuccess$ : Observable<any>;

  filters = [{id: "SHOW_ALL", title: "All"}, {id: "SHOW_COMPLETED", title: "Completed"}, {
    id: "SHOW_ACTIVE",
    title: "Active"
  }];

  constructor( private store : Store<any>, private todosEffects : TodosEffects ) {
    this.store.dispatch(getTodos());
    this.activeFilter$ = store.select("visibilityFilter").take(1);
    this.todos$ = store.select("todos");
    this.addTodoSuccess$ = this.todosEffects.addTodo$.filter(( {type} ) => type === ADD_TODO_SUCCESS);
  }

  changeFilter( filter ) {
    this.store.dispatch(setVisibilityFilter(filter));
    this.store.dispatch(getTodos());
  }

  toggle( todo ) {
    this.store.dispatch(toggleTodo(todo));
  }

  addTodo( todo ) {
    this.store.dispatch(addTodo(todo));
  }

}
