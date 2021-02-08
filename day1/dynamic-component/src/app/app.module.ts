import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NebularModule } from './nebular/nebular.module';
import { NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbEvaIconsModule } from '@nebular/eva-icons';
// componentes
import { AppComponent } from './app.component';
import { BarChartComponent } from './shared-components/bar-chart/bar-chart.component';
import { LineChartComponent } from './shared-components/line-chart/line-chart.component';
import { PieChartComponent } from './shared-components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbSidebarModule.forRoot(),
    NebularModule,
    NbEvaIconsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
