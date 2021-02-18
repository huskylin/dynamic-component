import { Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';
@Component({
  selector: 'ngx-small',
  templateUrl: './small.component.html',
  styleUrls: ['./small.component.scss'],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn, {
      params: { timing: 1, delay: 0 },
    }))]),
  ],
})
export class SmallComponent implements OnInit, OnChanges {
  @Input() removable = false;
  @Input() uniqueKey: number;
  @Input() shakeIdx: string;
  @Output() remove: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.removable && changes.removable.currentValue) {
      this.removable = changes.removable.currentValue;
    }
  }
  removeComponent() {
    this.remove.emit(this.uniqueKey);
  }
  randomShake() {
    if (this.removable) {
      return `shake-${this.shakeIdx}`;
    } else {
      return '';
    }
  }
}
