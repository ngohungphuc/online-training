import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store";
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { TodosService } from "./todos.service";
import { EffectsModule } from "@ngrx/effects";
import { TodosEffects } from "./todos.effects";
import { AddTodoComponent } from './add-todo/add-todo.component';
import { FiltersComponent } from "./filters/filters.component";
import { TodosPageComponent } from './todos-page/todos-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from "@angular/router";

export const GET_TODOS = "GET_TODOS";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_ERROR = "GET_TODOS_ERROR";
export const ADD_TODO = "ADD_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_ERROR = "ADD_TODO_ERROR";
export const TOGGLE_TODO = "TOGGLE_TODO";

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export function setVisibilityFilter( filter ) {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: filter
  }
}

export function getTodos() {
  return {
    type: GET_TODOS
  }
}

export function addTodo( title ) {
  return {
    type: ADD_TODO,
    payload: {
      id: Math.random(),
      title,
      completed: false,
    }
  }
}

export function toggleTodo( todo ) {
  return {
    type: TOGGLE_TODO,
    payload: todo
  }
}

const initialState = {
  data: [],
  pending: false,
  error: null
}

function todos( state = initialState, {type, payload} ) {
  switch( type ) {
    case GET_TODOS:
      return Object.assign({}, state, {pending: true, error: null, data: []})
    case GET_TODOS_SUCCESS:
      return Object.assign({}, state, {data: payload, pending: false})
    case GET_TODOS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"})
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        data: state.data.map(todo => {
          if( todo.id === payload.id ) {
            return Object.assign({}, todo, {completed: !todo.completed})
          }
          return todo;
        })
      })
    case ADD_TODO_SUCCESS:
      return Object.assign({}, state, {
        data: [...state.data, payload]
      });
    default:
      return state;
  }
}

const visibilityFilter = ( state = "SHOW_ALL", action ) => {
  switch( action.type ) {
    case SET_VISIBILITY_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const routes = [
  {path: "", component: HomePageComponent, patchMatch: "full"},
  {path: "todos", component: TodosPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodosComponent,
    FiltersComponent,
    AddTodoComponent,
    TodosPageComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore({todos, visibilityFilter}),
    EffectsModule.run(TodosEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
