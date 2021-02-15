import { Injectable, ComponentRef, SimpleChange } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor() { }
  wrapperRefs = Array<ComponentRef<any>>();
  chartRefs = Array<ComponentRef<any>>();
  // 記錄頁面元件數量狀態
  componentsArray = []

  pushWrapperRefs(componentRef: ComponentRef<any>) {
    this.wrapperRefs.push(componentRef);
  }
  pushChartRefs(componentRef: ComponentRef<any>) {
    this.chartRefs.push(componentRef);
  }
  pushComponent(component) {
    this.componentsArray.push(component);
  }
  getWrapperRefs() {
    return this.wrapperRefs;
  }
  async getComponentsArray() {
    if (this.componentsArray.length === 0) {
      // 可以設定成從後端撈取設定值
      const arr = []
      return arr;
    } else {
      return this.componentsArray;
    }
  }

}
