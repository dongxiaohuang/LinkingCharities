import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAddBgColor]'
})
export class AddBgColorDirective {

  constructor(private renderer: Renderer2, hostElement: ElementRef) {
    renderer.addClass(hostElement.nativeElement, 'bg-color');
  }
}
