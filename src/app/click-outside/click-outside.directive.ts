import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output('appClickOutside')
  public appClickOutside = new EventEmitter<any>();

  constructor(private _elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const isClickedInside = this._elementRef.nativeElement.contains(targetElement) || targetElement.className === 'psc-ellipsis';
    if (!isClickedInside) {
      this.appClickOutside.emit(null);
    }
  }
}
