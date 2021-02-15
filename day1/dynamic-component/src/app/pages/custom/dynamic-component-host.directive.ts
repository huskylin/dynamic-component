import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicComponentHost]',
})
export class DynamicComponentHostDirective {
  public viewContainerRef = this._viewContainerRef;
  constructor(private _viewContainerRef: ViewContainerRef) { }
}
