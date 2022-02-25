import { Directive, ElementRef, Renderer2, ViewChild, AfterViewInit, ViewContainerRef, TemplateRef, Input } from '@angular/core';

@Directive({
  selector: '[appHasAuthority]'
})
export class HasAuthorityDirective {


  constructor(
    private templateRef: TemplateRef<any>, 
    private viewContainerRef: ViewContainerRef) {}

  @Input()
  set appHasAuthority(value: string | string[]) {
    this.updateView(false);
  }

  private updateView(visible: boolean): void {
    this.viewContainerRef.clear();
    if (visible) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }


}
