import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Observable } from "rxjs";
import {
  GET_TODOS, GET_TODOS_SUCCESS, GET_TODOS_ERROR, ADD_TODO, ADD_TODO_SUCCESS,
  ADD_TODO_ERROR
} from "./app.module";
import { TodosService } from "./todos.service";
import { Store } from "@ngrx/store";

@Injectable()
export class TodosEffects {
  constructor( private actions$ : Actions, private todosService : TodosService, private store : Store<any> ) {
  }

  @Effect() getTodos$ = this.actions$
    .ofType(GET_TODOS)
    .withLatestFrom(this.store.select("visibilityFilter"), ( action, filter ) => filter)
    .switchMap(filter =>
      this.todosService.getTodos(filter)
        .map(todos => ({type: GET_TODOS_SUCCESS, payload: todos}))
        .catch(() => Observable.of({type: GET_TODOS_ERROR})));

  @Effect() addTodo$ = this.actions$
    .ofType(ADD_TODO)
    .switchMap(action =>
      this.todosService.addTodo(action.payload.title)
        .map(todo => ({type: ADD_TODO_SUCCESS, payload: todo}))
        .catch(() => Observable.of({type: ADD_TODO_ERROR})));
}