import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgaModule} from '../../theme/nga.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@angular/material';

import {
  DataTableModule,
  SharedModule,
  DialogModule,
  CalendarModule,
  PanelModule,
  AutoCompleteModule,
  TabViewModule
} from 'primeng/primeng';

import {Production} from './production.component';

import {routing} from './production.routing';
import {ControlPointService} from '../controlPoint/controlPoint.service';
import {LossTypeService} from '../lossType/lossType.service';
import {ProductionService} from './production.service';
import {ShiftService} from '../shift/shift.service';
import {SectionService} from '../section/section.service';
import {ProductionTable} from "./components/productionTable";
import {ProductionForm} from "./components/productionForm";
import {EmployeeService} from "../employee/employee.service";
import { ControlPointTypeService } from '../controlPointType/controlPointType.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    DataTableModule,
    DialogModule,
    CalendarModule,
    PanelModule,
    // MaterialModule,
    SharedModule,
    AutoCompleteModule,
    TabViewModule,
    routing
  ],
  declarations: [
    Production,
    ProductionTable,
    ProductionForm
  ],
  providers: [
    ProductionService,
    ShiftService,
    ControlPointService,
    SectionService,
    LossTypeService,
    EmployeeService,
    ControlPointTypeService
  ]
})
export class ProductionModule {
}
