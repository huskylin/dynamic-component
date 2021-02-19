import { Injectable, ComponentRef, SimpleChange } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  constructor(private utilsService: UtilsService) { }
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
  refreshRemoveMode(removeable) {
    this.wrapperRefs.forEach(c => {
      c.instance.removable = removeable;
    });
  }
  removeComponent(uniqueKey) {
    // 移除外層容器
    const idx = this.wrapperRefs.findIndex(e => e.instance.uniqueKey === uniqueKey)
    this.wrapperRefs[idx].destroy();
    this.wrapperRefs = this.wrapperRefs.filter(e => e.instance.uniqueKey !== uniqueKey);
    // 移除內部元件
    this.componentsArray.splice(idx, 1);
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
  updateInputData(component, targetRef, year) {
    // 產生 InputData
    const inputData = this.utilsService.getData(component.name, year);
    // 傳入到 Input 中，會觸發在 ngOnInit
    targetRef.instance['data'] = inputData;
    // 產生 change
    const changes = {
      data: new SimpleChange(undefined, inputData, false)
    };
    // 傳入到 Onchange
    if (typeof targetRef.instance.ngOnChanges !== 'undefined') {
      targetRef.instance.ngOnChanges(changes);
    }
  }

}
