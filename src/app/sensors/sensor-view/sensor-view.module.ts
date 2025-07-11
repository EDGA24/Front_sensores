import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SensorViewComponent } from './sensor-view.component';
import { Sensor1Module } from '../sensor1/sensor1.module';
import { Sensor2Module } from '../sensor2/sensor2.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [SensorViewComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    RouterLink,
    NgApexchartsModule,
    Sensor1Module,
    Sensor2Module,
  ],
})
export class SensorViewModule {}
