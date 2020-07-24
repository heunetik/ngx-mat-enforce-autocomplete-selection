import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mat-es-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith<string | any>(''),
      distinctUntilChanged(),
      map((value: string) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    if (!value) {
      return this.options;
    }
    return this.options.filter(option => option.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}
