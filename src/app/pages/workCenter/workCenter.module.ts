import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { WorkCenter } from './workCenter.component';
import { WorkCenterService } from '../../services/workCenter.service';
import { WorkCenterTable } from './components/workCenterTable/workCenterTable.component';
import { WorkCenterForm } from './components/workCenterForm/workCenterForm.component';

import { routing } from './workCenter.routing';


@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    routing
  ],
  declarations: [
    WorkCenter,
    WorkCenterTable,
    WorkCenterForm
  ],
  providers: [
    WorkCenterService
  ]
})
export class WorkCenterModule { }