import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule, PanelModule, InputTextModule, CalendarModule } from 'primeng/primeng';

import { Department } from './department.component';
import { DepartmentTable } from './components/departmentTable/departmentTable.component';
import { DepartmentForm } from './components/departmentForm/departmentForm.component';

import { routing } from './department.routing';
import { DepartmentService } from './department.service';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    InputTextModule,
    CalendarModule,
    routing
  ],
  declarations: [
    Department,
    DepartmentTable,
    DepartmentForm
  ],
  providers: [
    DepartmentService
  ]
})
export class DepartmentModule { }
