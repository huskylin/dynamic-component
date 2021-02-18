import { UtilsService } from './../../services/utils.service';
import { AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { CustomService } from 'src/app/services/custom.service';
import { DynamicComponentHostDirective } from './dynamic-component-host.directive';
import { SmallComponent } from 'src/app/shared-components/custom/small/small.component';

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss']
})
export class CustomComponent implements OnInit, AfterViewInit {
  @ViewChildren(DynamicComponentHostDirective) dcHosts: QueryList<DynamicComponentHostDirective>;
  constructor(
    private cfr: ComponentFactoryResolver,
    private sidebarService: NbSidebarService,
    private renderer2: Renderer2,
    private customService: CustomService,
    private utilsService: UtilsService,
  ) { }
  sideState = false;
  editable = true;
  removeable = false;
  childUniqueKey: number = 0;
  componentsIndex: Array<number> = [];
  componentsReferences = Array<ComponentRef<any>>();
  wrappers = {
    small: SmallComponent,
  };
  sizeMap = {
    small: 'col-md-3',
  };
  shakeIdx = ['1', '2', '3'];


  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.loadComponents();
  }
  createComponent(component, isNew) {
    // STEP1: 收合側元件選單
    this.sideBarCollapse();
    // STEP2: 開始產生元件
    this.dcHosts.forEach(host => {
      // 要拿來放元件，view 的參照位置
      const vcRef = host.viewContainerRef;
      // 製作被選擇要出來的元件，targetComponent 目標功能元件, wrapperComponent 決定大小的外框元件
      const allComponents = this.utilsService.getAllComponents();
      const targetComponent: any = allComponents.filter(e => e.name === component.name)[0].val;
      const wrapperComponent: any = this.wrappers['small'];
      const wrapperFactory = this.cfr.resolveComponentFactory(wrapperComponent);
      const componentFactory = this.cfr.resolveComponentFactory(targetComponent);
      // 先產生目標圖表元件
      const targetRef = vcRef.createComponent(componentFactory);
      // 在參照位置產生外框元件，並且透過 ng-content，將目標圖表元件放進來
      const wrapperRef = vcRef.createComponent(wrapperFactory, vcRef.length, undefined, [[targetRef.location.nativeElement]]);
      // 用 renderer2 在產生出來的元件上 加上 class
      this.renderer2.addClass(wrapperRef.location.nativeElement, this.sizeMap['small']);
      // 記錄 component 唯一值
      wrapperRef.instance['uniqueKey'] = ++this.childUniqueKey;
      // 給予不同的 shakeIdx 製造刪除動畫的隨機感
      wrapperRef.instance['shakeIdx'] = this.shakeIdx[this.childUniqueKey % 3];
      // 儲存 wrapper 跟 target 的 ref，之後更新資料、刪除元件時會用
      this.customService.pushWrapperRefs(wrapperRef);
      this.customService.pushChartRefs(targetRef);
      // 如果開著刪除模式，新增的元件也要開啟刪除模式
      this.customService.refreshRemoveMode(this.removeable);
      // 訂閱刪除事件
      const self = this;
      wrapperRef.instance['remove'].subscribe(componentIdx => {
        self.customService.removeComponent(componentIdx);
      });
    });
    // STEP3: 儲存目前有哪些 components
    if (isNew) {
      this.customService.pushComponent(component.name);
    }
  }

  // 編輯元件模式
  toggleEditMode(event) {
    this.editable = event;
  }
  // 移除元件模式
  toggleRemoveMode(event) {
    // 把每一個元件加上 remove 的 class 以顯示動畫
    this.removeable = event;
    this.customService.refreshRemoveMode(this.removeable);
  }
  async loadComponents() {
    // 讀取使用者儲存了頁面有哪些元件，並且一一創造出來
    const components = await this.customService.getComponentsArray();
    components
      .map(c => this.utilsService.getAllComponents().find(e => e.name === c))
      .forEach(c => this.createComponent(c, false));
  }
  // 側選單相關
  sideBarExpand() {
    // 收合側元件選單
    this.sideState = true;
    this.sidebarService.expand('selector');
  }
  sideBarCollapse() {
    // 收合側元件選單
    this.sideState = false;
    this.sidebarService.collapse('selector');
  }
  sidebarToggle() {
    this.sideState = !this.sideState
    this.sidebarService.toggle(true, 'selector');
  }
  addComponent() {
    this.sideBarExpand();
  }
  chooseSize() {
    this.addComponent();
  }
}
