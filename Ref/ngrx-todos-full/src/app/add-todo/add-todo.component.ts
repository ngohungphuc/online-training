import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'add-todo',
  template: `<input type="text" placeholder="Add todo.." [formControl]="control">
             <button (click)="add.next(control.value)">Add</button>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  control : FormControl = new FormControl("");
  @Output() add = new EventEmitter();

  @Input()
  public set reset( value : boolean ) {
    value && this.control.reset();
  }

}
