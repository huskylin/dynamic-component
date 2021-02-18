import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { NebularModule } from './nebular/nebular.module';
import { NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbEvaIconsModule } from '@nebular/eva-icons';
// Componentes
import { AppComponent } from './app.component';
import { BarChartComponent } from './shared-components/bar-chart/bar-chart.component';
import { LineChartComponent } from './shared-components/line-chart/line-chart.component';
import { PieChartComponent } from './shared-components/pie-chart/pie-chart.component';
import { CustomComponent } from './pages/custom/custom.component';
import { AddButtonComponent } from './shared-components/custom/add-button/add-button.component';
import { ComponentSelectorComponent } from './shared-components/custom/component-selector/component-selector.component';
import { SmallComponent } from './shared-components/custom/small/small.component';
// Directive
import { DynamicComponentHostDirective } from './pages/custom/dynamic-component-host.directive';


@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    CustomComponent,
    AddButtonComponent,
    SmallComponent,
    ComponentSelectorComponent,
    DynamicComponentHostDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbSidebarModule.forRoot(),
    NebularModule,
    NbEvaIconsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  entryComponents: [PieChartComponent, BarChartComponent, LineChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
