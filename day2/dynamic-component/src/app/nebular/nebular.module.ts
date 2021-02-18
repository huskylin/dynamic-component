import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

import {
  NbStepperModule,
  NbCalendarModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule,
  NbAccordionModule,
  NbCheckboxModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbTreeGridModule,
  NbTabsetModule,
  NbMenuModule,
  NbIconModule,
  NbSidebarModule,
  NbLayoutModule,
  NbToggleModule,
  NbToastrModule,
} from '@nebular/theme';

const modules = [
  CommonModule,
  NgxEchartsModule,
  NbStepperModule,
  NbCalendarModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbDatepickerModule,
  NbInputModule,
  NbSelectModule,
  NbAccordionModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbSpinnerModule,
  NbTooltipModule,
  NbMenuModule,
  NbIconModule,
  NbSidebarModule,
  NbLayoutModule,
  NbToggleModule,
  NbToastrModule,
];

@NgModule({
  declarations: [],
  imports: modules,
  exports: modules,
})

export class NebularModule { }
