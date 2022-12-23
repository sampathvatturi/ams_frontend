import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthRoutingModule } from './auth-routing.module';

const antdModule = [
  NzButtonModule,
  NzCardModule,
  NzAvatarModule,
  NzRateModule, NzInputModule,
  NzBadgeModule,
  NzProgressModule,
  NzRadioModule,
  NzTableModule,
  NzDropDownModule,
  NzTimelineModule,
  NzTabsModule,
  NzTagModule,
  NzListModule,
  NzCalendarModule,
  NzToolTipModule,
  NzCheckboxModule
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule, FormsModule, ReactiveFormsModule,
    ...antdModule

  ],
  providers : [ ],
  exports: []
})

export class AuthModule { }
