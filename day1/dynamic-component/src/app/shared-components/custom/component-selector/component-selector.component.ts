import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-component-selector',
  templateUrl: './component-selector.component.html',
  styleUrls: ['./component-selector.component.scss']
})
export class ComponentSelectorComponent implements OnInit, OnChanges {
  @Input() sizeFilter: string;
  @Output() choosed: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private utilsService: UtilsService,
  ) { }
  page1Source = this.utilsService.Page1Components;
  page2Source = this.utilsService.Page2Components;
  page1Components = this.utilsService.Page1Components;
  page2Components = this.utilsService.Page2Components;

  chooseComponent(name) {
    this.choosed.emit(name);
  }
  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    console.log(changes);
    // if (changes.sizeFilter && changes.sizeFilter.currentValue) {
    //   this.sizeFilter = changes.sizeFilter.currentValue;
    //   console.log(this.sizeFilter);
    //   this.page1Components = this.page1Source.filter(e => e.size === this.sizeFilter);
    //   this.page2Components = this.page2Source.filter(e => e.size === this.sizeFilter);
    // }
  }
}
