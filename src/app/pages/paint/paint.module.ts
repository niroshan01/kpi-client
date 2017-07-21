import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableModule, SharedModule,PanelModule } from 'primeng/primeng';

import { Paint } from './paint.component';
import { PaintService } from '../../services/paint.service';
import { PaintTable } from './components/paintTable/paintTable.component';
import { PaintForm } from './components/paintForm/paintForm.component';

import { routing } from './paint.routing';


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
    Paint,
    PaintTable,
    PaintForm
  ],
  providers: [
    PaintService
  ]
})
export class PaintModule { }