import { Directive, Input, Host, Self, AfterViewInit, OnDestroy } from '@angular/core';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ngxMatEnforceAutocompleteSelection]'
})
export class MatEnforceAutocompleteSelectionDirective implements AfterViewInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input()
  matAutocomplete: MatAutocomplete;

  constructor(@Host() @Self() private readonly autoCompleteTrigger: MatAutocompleteTrigger, private readonly ngControl: NgControl) { }

  ngAfterViewInit(): void {
    this.autoCompleteTrigger.panelClosingActions.pipe(
      takeUntil(this.destroy$)
    ).subscribe((e) => {
      if (!e || !e.source) {
        const selected = this.matAutocomplete.options
          .map(option => option.value)
          .find(option => option === this.ngControl.value);
        if (selected == null) {
          this.ngControl.reset();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
