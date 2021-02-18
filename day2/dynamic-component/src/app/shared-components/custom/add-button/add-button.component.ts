import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit, OnChanges {
  constructor() { }
  @Input() size: string = 'col-md-3';
  @Input() haveOption: boolean;
  @Output() chooseSize: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {

  }
  choosedSize(size) {
    this.chooseSize.emit(size);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.haveOption && changes.haveOption.currentValue) {
      this.haveOption = changes.haveOption.currentValue;
      // this.index = changes.index.currentValue;
    }
  }

}
